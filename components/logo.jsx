import { User } from "lucide-react"

export function Logo({ size = "default" }) {
  const sizes = {
    small: "h-6 w-6",
    default: "h-8 w-8",
    large: "h-12 w-12",
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizes[size]} rounded-full bg-primary flex items-center justify-center`}>
        <User
          className={
            size === "small" ? "h-3 w-3 text-white" : size === "large" ? "h-6 w-6 text-white" : "h-5 w-5 text-white"
          }
        />
      </div>
      <span className={`font-bold ${size === "small" ? "text-base" : size === "large" ? "text-xl" : "text-lg"}`}>
        فونیکسو
      </span>
    </div>
  )
}
