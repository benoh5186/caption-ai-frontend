import {useState, useEffect} from "react"
import { fetchSessions } from "../services/fetch-sessions.jsx";
import SessionPage from './session-page.jsx'

export default function Dashboard( {onSessionExpired} ) {
    const [sessions, setSessions] = useState({});
    const [error, setError] = useState(false);

    useEffect(()=> {
        async function loadSessions() {
            try {
                const data = await fetchSessions()
                setSessions(data)
            }
            catch (err) {
                if (err instanceof SessionExpired) {
                    onSessionExpired()
                } 
                setError(true)
                return
            }
        }
        loadSessions()
    }, onSessionExpired)
}