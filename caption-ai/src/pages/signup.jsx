import { useEffect, useState } from "react"
import { checkAuth } from "../services/auth-check"


export default function Signup({ onSignUpSuccess, onLoginClick }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailExists, setEmailExists] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function authenticateUser() {
            const isAuthenticated = await checkAuth()
            if (isAuthenticated) {
                onSignUpSuccess()
            }
        }
        authenticateUser()
    }, [onSignUpSuccess])

    function checkPassword() {
        if (password === confirmPassword) {
            return true
        }
        return false
    }
    function setFieldErrors(detail) {
        const theErrors = detail.reduce((acc, error) => {
            acc.push(error.loc[1])
            return acc
        }, [])
        if (theErrors.includes("email")) {
            setEmailError(true)
        }
        if (theErrors.includes("password")) {
            setPasswordError(true)
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (!checkPassword()) {
            setPasswordError(true)
            return
        }
        setIsSubmitting(true)
        setEmailExists(false)
        setEmailError(false)
        setPasswordError(false)
        setError(false)

        try {
            const response = await fetch("/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })
            const status = response.status
            if (response.ok) {
                onSignUpSuccess()
            } else if (status === 422) {
                const data = await response.json()
                setFieldErrors(data.detail)
            } else if (status === 409) {
                setEmailExists(true)
            }
        } 
        catch {
            setError(true)
        } 
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="signup-page">
            <section className="signup-panel" aria-labelledby="signup-title">
                <h1 id="signup-title">Sign up</h1>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="signup-email">Email</label>
                    <input
                        id="signup-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        aria-invalid={emailError || emailExists}
                        required
                    />

                    {emailError && (
                        <p className="signup-error" role="alert">
                            Please enter a valid email address.
                        </p>
                    )}

                    {emailExists && (
                        <p className="signup-error" role="alert">
                            An account with this email already exists.
                        </p>
                    )}

                    <label htmlFor="signup-password">Password</label>
                    <input
                        id="signup-password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        aria-invalid={passwordError}
                        required
                    />

                    <label htmlFor="signup-confirm-password">Confirm password</label>
                    <input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        autoComplete="new-password"
                        aria-invalid={passwordError}
                        required
                    />

                    {passwordError && (
                        <p className="signup-error" role="alert">
                            Please check that your passwords match and meet the requirements.
                        </p>
                    )}

                    {error && (
                        <p className="signup-error" role="alert">
                            Signup failed. Please try again.
                        </p>
                    )}

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating account..." : "Sign up"}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <button type="button" onClick={onLoginClick}>
                        Log in
                    </button>
                </p>
            </section>
        </main>
    )
}
