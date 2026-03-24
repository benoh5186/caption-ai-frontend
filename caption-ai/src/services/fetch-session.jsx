export async function fetchSession(sessionId) {
    const response = fetch(`example.com/api/load-session?${encodeURIComponent(sessionId)}`)
    if (response.ok) {
        const data = await response.json()
        return data 
    } else {
        throw new Error("Failed to load session")
    }
}