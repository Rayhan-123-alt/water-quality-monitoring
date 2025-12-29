import { RegisterForm } from "@/components/auth/register-form"
import { Droplet } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="rounded-full bg-primary/10 p-4 mb-2">
            <Droplet className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-balance">Create Account</h1>
          <p className="text-muted-foreground text-center text-balance">Start monitoring your water quality today</p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
