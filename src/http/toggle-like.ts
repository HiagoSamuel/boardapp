import { LikeResponseSchema } from "@/api/routes/schemas/issue-likes"
import { clientEnv } from "@/env"
import { parseJsonResponse } from "./utils/parse-json-response"

interface ToggleLikeParams {
  issueId: string
}

export async function toggleLike({ issueId }: ToggleLikeParams) {
  const url = new URL(
    `/api/issues/${issueId}/like`,
    clientEnv.NEXT_PUBLIC_API_URL,
  )
  const response = await fetch(url, {
    method: "POST",
  })

  return parseJsonResponse(response, LikeResponseSchema)
}
