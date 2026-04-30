import { cacheLife } from "next/cache"
import { IssuesListResponseSchema } from "@/api/routes/schemas/issues"
import { clientEnv } from "@/env"
import { parseJsonResponse } from "./utils/parse-json-response"

interface ListIssuesParams {
  search?: string
}

export async function listIssues({ search }: ListIssuesParams = {}) {
  "use cache"

  cacheLife("minutes")

  const url = new URL("/api/issues", clientEnv.NEXT_PUBLIC_API_URL)

  if (search) {
    url.searchParams.set("search", search)
  }

  const response = await fetch(url)

  return parseJsonResponse(response, IssuesListResponseSchema)
}
