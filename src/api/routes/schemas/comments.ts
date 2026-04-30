import { z } from "zod"

export const CommentAuthorSchema = z.object({
  name: z.string(),
  avatar: z.url(),
})

export const CommentSchema = z.object({
  id: z.uuidv4(),
  issueId: z.uuidv4(),
  author: CommentAuthorSchema,
  text: z.string(),
  createdAt: z.string().datetime(),
})

export const CommentsListResponseSchema = z.object({
  comments: z.array(CommentSchema),
  total: z.number().int(),
  limit: z.number().int(),
  offset: z.number().int(),
})
