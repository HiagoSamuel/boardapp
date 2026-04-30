import "server-only"

import { updateTag } from "next/cache"
import { headers } from "next/headers"
import { CommentSchema } from "@/api/routes/schemas/comments"
import { clientEnv } from "@/env"
import { getCookiesFromHeaders } from "./utils/get-cookies-from-headers"
import { parseJsonResponse } from "./utils/parse-json-response"

interface CreateCommentParams {
  issueId: string
  text: string
}

export async function createComment({ issueId, text }: CreateCommentParams) {
  const url = new URL(
    `/api/issues/${issueId}/comments`,
    clientEnv.NEXT_PUBLIC_API_URL,
  )

  const incomingHeaders = await headers()

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: getCookiesFromHeaders(incomingHeaders),
  })

  updateTag(`issue-comments-${issueId}`)

  return parseJsonResponse(response, CommentSchema)
}
