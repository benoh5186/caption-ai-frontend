import { useState } from 'react'
import './App.css'
import Dashboard from './pages/dashboard.jsx'
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authPage, setAuthPage] = useState("login")
    if (isLoggedIn) {
        return <Dashboard onSessionExpired={() => {
                            setIsLoggedIn(false)
                            setAuthPage("login")     
                        }}/>
    } 
    if (authPage === "signup") {
        return <Signup 
                    onSignupSuccess={() => setAuthPage("login") }
                    onLoginClick={() => setAuthPage("login")}/>
    }
    return <Login 
                onLoginSuccess={() => setIsLoggedIn(true)}
                onSignUpClick={() => setAuthPage("signup")}
            />

}

export default App
