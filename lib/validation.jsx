export const validatePhoneNumber = (phone) => {
  // Persian phone number validation (starts with 09 and has 11 digits)
  const phoneRegex = /^09\d{9}$/
  if (!phone) return "شماره موبایل الزامی است"
  if (!phoneRegex.test(phone)) return "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"
  return null
}

export const validateVerificationCode = (code) => {
  if (!code) return "کد تایید الزامی است"
  if (code.length !== 5) return "کد تایید باید ۵ رقم باشد"
  if (!/^\d+$/.test(code)) return "کد تایید باید عدد باشد"
  return null
}

export const validateName = (name) => {
  if (!name) return "این فیلد الزامی است"
  if (name.length < 2) return "نام باید حداقل ۲ حرف باشد"
  return null
}

export const validateNationalCode = (code) => {
  if (!code) return "کد ملی الزامی است"

  // National code validation (10 digits)
  const nationalCodeRegex = /^\d{10}$/
  if (!nationalCodeRegex.test(code)) return "کد ملی باید ۱۰ رقم باشد"

  // Additional validation for Iranian national code
  let sum = 0
  const controlDigit = Number.parseInt(code[9])
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(code[i]) * (10 - i)
  }
  const remainder = sum % 11
  const valid = (remainder < 2 && controlDigit === remainder) || (remainder >= 2 && controlDigit === 11 - remainder)

  if (!valid) return "کد ملی نامعتبر است"
  return null
}

export const validateEmail = (email) => {
  if (!email) return "ایمیل الزامی است"

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "فرمت ایمیل نامعتبر است"

  return null
}

export const validatePostalCode = (code) => {
  if (!code) return "کد پستی الزامی است"

  // Postal code validation (10 digits)
  const postalCodeRegex = /^\d{10}$/
  if (!postalCodeRegex.test(code)) return "کد پستی باید ۱۰ رقم باشد"

  return null
}
