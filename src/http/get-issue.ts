import { IssueSchema } from "@/api/routes/schemas/issues"
import { clientEnv } from "@/env"
import { parseJsonResponse } from "./utils/parse-json-response"

interface GetIssueParams {
  id: string
}

export async function getIssue({ id }: GetIssueParams) {
  "use cache"

  const url = new URL(`/api/issues/${id}`, clientEnv.NEXT_PUBLIC_API_URL)

  const response = await fetch(url)

  return parseJsonResponse(response, IssueSchema)
}
