import { redirect } from "next/navigation"

export default function DashboardRedirect() {
  // In a real application, you would check the user role here
  // and redirect to either /dashboard/user or /dashboard/admin
  // For now, we'll redirect to the admin dashboard
  redirect("/dashboard/admin")
}
