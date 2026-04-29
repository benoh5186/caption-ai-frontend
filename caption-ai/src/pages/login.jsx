import {useState, useEffect} from "react"


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch("/api/v1/login",
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ email, password })
            }
        )
        if (!response.ok) {
            throw new Error()

        } else {

        }
    }

    
}
