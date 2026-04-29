export async function checkAuth() {
    const response = await fetch("/api/v1/authenticate", {
        credentials: "include"
    })
    if (!response.ok) {
        return false
    }
    return true 
}