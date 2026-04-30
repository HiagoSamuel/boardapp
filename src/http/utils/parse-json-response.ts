import type { z } from "zod"

export async function parseJsonResponse<TSchema extends z.ZodType>(
  response: Response,
  schema: TSchema,
): Promise<z.infer<TSchema>> {
  const text = await response.text()
  let data: unknown

  try {
    data = text ? JSON.parse(text) : null
  } catch {
    throw new Error(
      `HTTP ${response.status} ${response.statusText}: ${text || "Empty response"}`,
    )
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : JSON.stringify(data)

    throw new Error(
      `HTTP ${response.status} ${response.statusText}: ${message}`,
    )
  }

  return schema.parse(data)
}
