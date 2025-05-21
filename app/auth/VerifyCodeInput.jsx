import { Input } from "@/components/ui/input"
import { useRef } from "react"

export default function VerifyCodeInput({ code, setCode, error }) {
  const refs = useRef([])

  const handleChange = (i, value) => {
    if (value.length > 1) value = value.charAt(0)
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[i] = value
    setCode(newCode)

    if (value && i < 4) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-2 py-4" dir="ltr">
      {code.map((digit, i) => (
        <Input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          ref={(el) => (refs.current[i] = el)}
          className={`w-12 h-12 text-center text-lg shadow-sm ${error ? "border-destructive" : ""}`}
        />
      ))}
    </div>
  )
}
