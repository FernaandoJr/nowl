import { cn } from "@/lib/utils"

type OwlMarkProps = {
  className?: string
}

export function OwlMark({ className }: OwlMarkProps) {
  return (
    <img
      src="/nowl-ip-a1.svg"
      alt=""
      width={1024}
      height={1024}
      className={cn("shrink-0 rounded-lg", className)}
    />
  )
}
