import { NETWORK_ERROR } from "../constants/errorMessages";

export async function handleApiResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || NETWORK_ERROR);
  }
  return res.json();
}
