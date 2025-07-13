import request from 'supertest';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { app, setDb } from '../index';

let db: any;

describe('API', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    db = await open({ filename: ':memory:', driver: sqlite3.Database });
    await db.exec(`CREATE TABLE IF NOT EXISTS conversions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inputValue TEXT NOT NULL,
    convertedValue TEXT NOT NULL,
    direction TEXT NOT NULL
  )`);
    setDb(db);
  });

  afterAll(async () => {
    await db.close();
  });

  it('converts arabic to roman', async () => {
    const res = await request(app).get('/api/roman/123');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ inputValue: 123, convertedValue: 'CXXIII' });
  });
  it('rejects invalid arabic', async () => {
    const res = await request(app).get('/api/roman/0');
    expect(res.status).toBe(400);
  });
  it('converts roman to arabic', async () => {
    const res = await request(app).get('/api/arabic/XLII');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ inputValue: 'XLII', convertedValue: 42 });
  });
  it('rejects invalid roman', async () => {
    const res = await request(app).get('/api/arabic/FOO');
    expect(res.status).toBe(400);
  });
  it('deduplicates conversions', async () => {
    await request(app).get('/api/roman/10');
    await request(app).get('/api/roman/10');
    const all = await request(app).get('/api/all');
    expect(all.body.filter((r: any) => r.inputValue === '10').length).toBe(1);
  });
  it('lists all conversions', async () => {
    await request(app).get('/api/roman/5');
    await request(app).get('/api/arabic/V');
    const res = await request(app).get('/api/all');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
  it('removes all conversions', async () => {
    await request(app).get('/api/roman/7');
    const del = await request(app).delete('/api/remove');
    expect(del.status).toBe(200);
    expect(typeof del.body.deleted).toBe('number');
    const all = await request(app).get('/api/all');
    expect(all.body.length).toBe(0);
  });
}); 