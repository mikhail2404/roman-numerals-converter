import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { isValidRoman, romanToArabic, arabicToRoman } from './utils/conversion';
import { db, getOrInsertConversion, start, setDb } from './database/db';
import { Conversion, CONVERSION_DIRECTION } from './types/Conversion';

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.get('/api/roman/:inputValue', async (req: Request, res: Response, next: NextFunction) => {
  const input = req.params.inputValue;
  const num = Number(input);
  if (isNaN(num) || num < 1 || num > 3999) {
    return res.status(400).json({ error: 'Invalid number' });
  }
  try {
    const existing = await db.get<Conversion>(
      'SELECT * FROM conversions WHERE inputValue = ? AND direction = ?',
      [num.toString(), CONVERSION_DIRECTION.ARABIC_TO_ROMAN]
    );
    if (existing) {
      return res.json({ inputValue: num, convertedValue: existing.convertedValue });
    }
    const roman = arabicToRoman(num);
    if (!roman) {
      return res.status(400).json({ error: 'Conversion failed' });
    }
    await getOrInsertConversion(num, CONVERSION_DIRECTION.ARABIC_TO_ROMAN, roman);
    return res.json({ inputValue: num, convertedValue: roman });
  } catch (err) {
    next(err);
  }
});

app.get('/api/arabic/:inputValue', async (req: Request, res: Response, next: NextFunction) => {
  const input = req.params.inputValue;
  if (!isValidRoman(input)) {
    return res.status(400).json({ error: 'Invalid roman numeral' });
  }
  try {
    const existing = await db.get<Conversion>(
      'SELECT * FROM conversions WHERE inputValue = ? AND direction = ?',
      [input.toUpperCase(), CONVERSION_DIRECTION.ROMAN_TO_ARABIC]
    );
    if (existing) {
      return res.json({ inputValue: input.toUpperCase(), convertedValue: existing.convertedValue });
    }
    const arabic = romanToArabic(input);
    if (arabic === null) {
      return res.status(400).json({ error: 'Conversion failed' });
    }
    await getOrInsertConversion(input.toUpperCase(), CONVERSION_DIRECTION.ROMAN_TO_ARABIC, arabic);
    return res.json({ inputValue: input.toUpperCase(), convertedValue: arabic });
  } catch (err) {
    next(err);
  }
});

app.get('/api/all', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await db.all<Conversion>('SELECT * FROM conversions');
    res.json(all);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/remove', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.run('DELETE FROM conversions');
    res.status(200).json({ deleted: result.changes });
  } catch (err) {
    next(err);
  }
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? err?.message : undefined });
});

export { app, db, setDb, isValidRoman, romanToArabic, arabicToRoman, getOrInsertConversion };

if (process.env.NODE_ENV !== 'test') {
  start().then(() => {
    app.listen(3001, () => console.log('API server running on http://localhost:3001'));
  });
} 