import { useEffect, useState } from "react"
import { checkAuth } from "../services/auth-check"


export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function authenticateUser() {
            const isAuthenticated = await checkAuth()
            if (isAuthenticated) {
                onLoginSuccess()
            }
        }
        authenticateUser()
    }, [onLoginSuccess])

    async function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)
        setError(false)

        try {
            const response = await fetch("/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                setError(true)
                return
            }

            onLoginSuccess()
        } catch {
            setError(true)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="login-page">
            <section className="login-panel" aria-labelledby="login-title">
                <h1 id="login-title">Log in</h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                        required
                    />

                    {error && (
                        <p className="login-error" role="alert">
                            Login failed. Please check your email and password.
                        </p>
                    )}

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Log in"}
                    </button>
                </form>
            </section>
        </main>
    )
}
