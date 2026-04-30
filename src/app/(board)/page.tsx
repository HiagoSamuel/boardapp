import type { Metadata } from "next"
import { listIssues } from "@/http/list-issues"
import { BoardContent } from "./board-content"

export const metadata: Metadata = {
  title: "Board",
}

interface BoardProps {
  searchParams: Promise<{ q?: string }>
}

export default async function Board({ searchParams }: BoardProps) {
  const { q } = await searchParams

  const issues = await listIssues({ search: q }).catch((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "Unable to load board issues"

    return { error: message }
  })

  if ("error" in issues) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col gap-5 rounded-xl border border-red-500/30 bg-red-950/20 p-6 text-red-50">
        <div>
          <p className="font-semibold text-lg">Database is not available</p>
          <p className="mt-2 text-red-100 text-sm">
            The board could not load issues because the API failed to connect to
            Postgres.
          </p>
        </div>

        <pre className="overflow-x-auto rounded-lg bg-red-950/40 p-4 text-red-100 text-xs">
          {messageForDisplay(issues.error)}
        </pre>

        <div className="space-y-2 text-red-100 text-sm">
          <p>Start Docker Desktop, then run:</p>
          <pre className="overflow-x-auto rounded-lg bg-navy-950 p-4 text-navy-50 text-xs">
            docker compose up -d postgres{"\n"}
            pnpm run db:migrate{"\n"}
            pnpm run db:seed
          </pre>
        </div>
      </main>
    )
  }

  return <BoardContent issues={issues} />
}

function messageForDisplay(message: string) {
  return message.length > 600 ? `${message.slice(0, 600)}...` : message
}
