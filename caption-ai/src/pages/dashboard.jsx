import {useState, useEffect} from "react"
import SessionPage from './session-page.jsx'

export default function Dashboard( {onSessionExpired} ) {
    const [sessions, setSessions] = useState({});
    const [error, setError] = useState(false);

    useEffect(()=> {
        
    }, onSessionExpired)
}