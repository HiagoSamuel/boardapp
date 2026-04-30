import { cacheLife, cacheTag } from "next/cache"
import { CommentsListResponseSchema } from "@/api/routes/schemas/comments"
import { clientEnv } from "@/env"
import { parseJsonResponse } from "./utils/parse-json-response"

interface ListIssueCommentsParams {
  issueId: string
}

export async function listIssueComments({ issueId }: ListIssueCommentsParams) {
  "use cache"

  cacheLife("minutes")
  cacheTag(`issue-comments-${issueId}`)

  const url = new URL(
    `/api/issues/${issueId}/comments`,
    clientEnv.NEXT_PUBLIC_API_URL,
  )

  const response = await fetch(url)

  return parseJsonResponse(response, CommentsListResponseSchema)
}
