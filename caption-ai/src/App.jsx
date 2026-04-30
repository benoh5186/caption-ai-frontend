import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SessionPage from './pages/session-page.jsx'
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authPage, setAuthPage] = useState("login")
    if (isLoggedIn) {
        return <SessionPage sessionId="demo-session-123" />
    } 
    if (authPage === "signup") {
        return <Signup onSignupSuccess={() => setAuthPage("login") }/>
    }
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />

}

export default App
