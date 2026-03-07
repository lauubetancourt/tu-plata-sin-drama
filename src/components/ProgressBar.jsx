import { Progress } from '@/components/ui/progress'

export function ProgressBar({ value }) {
  return (
    <Progress className="gap-0" value={Math.max(0, Math.min(100, value))} />
  )
}
