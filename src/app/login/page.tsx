import { LoginForm } from "@/components/auth/login-form"
import { Droplet } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="rounded-full bg-primary/10 p-4 mb-2">
            <Droplet className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-balance">Water Tank Monitor</h1>
          <p className="text-muted-foreground text-center text-balance">Sign in to monitor your water quality</p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          {"Don't have an account? "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
