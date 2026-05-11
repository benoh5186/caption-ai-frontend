export async function checkAuth() {
    const response = await fetch("http://localhost:8000/api/v1/auth/authenticate", {
        credentials: "include"
    })
    if (!response.ok) {
        return false
    }
    return true 
}