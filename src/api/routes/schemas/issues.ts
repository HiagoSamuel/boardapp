import { z } from "zod"

export const IssueStatusSchema = z.enum([
  "backlog",
  "todo",
  "in_progress",
  "done",
])

export const IssueCardSchema = z.object({
  id: z.string(),
  issueNumber: z.number().int(),
  title: z.string(),
  status: IssueStatusSchema,
  comments: z.number().int(),
})

export const IssuesListResponseSchema = z.object({
  backlog: z.array(IssueCardSchema),
  todo: z.array(IssueCardSchema),
  in_progress: z.array(IssueCardSchema),
  done: z.array(IssueCardSchema),
})

export const IssueSchema = z.object({
  id: z.uuidv4(),
  issueNumber: z.number().int(),
  title: z.string(),
  description: z.string(),
  status: IssueStatusSchema,
  comments: z.number().int(),
  createdAt: z.string().datetime(),
})
