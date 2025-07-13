import { vi } from "vitest";

import { NETWORK_ERROR } from "../../constants/errorMessages";
import { handleApiResponse } from "../api";

describe("handleApiResponse", () => {
  it("returns parsed JSON for a successful response", async () => {
    const mockJson = { foo: "bar" };
    const res: Partial<Response> = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockJson),
    };
    const result = await handleApiResponse(res as Response);
    expect(result).toEqual(mockJson);
  });

  it("throws error with message from response if not ok", async () => {
    const res: Partial<Response> = {
      ok: false,
      json: vi.fn().mockResolvedValue({ error: "Custom error" }),
    };
    await expect(handleApiResponse(res as Response)).rejects.toThrow(
      "Custom error"
    );
  });

  it("throws NETWORK_ERROR if not ok and no error in response", async () => {
    const res: Partial<Response> = {
      ok: false,
      json: vi.fn().mockResolvedValue({}),
    };
    await expect(handleApiResponse(res as Response)).rejects.toThrow(
      NETWORK_ERROR
    );
  });

  it("throws NETWORK_ERROR if not ok and response.json throws", async () => {
    const res: Partial<Response> = {
      ok: false,
      json: vi.fn().mockRejectedValue(new Error("fail")),
    };
    await expect(handleApiResponse(res as Response)).rejects.toThrow(
      NETWORK_ERROR
    );
  });
});
