import {useState, useEffect} from "react"
import { fetchSessions } from "../services/fetch-sessions.jsx";
import SessionPage from './session-page.jsx'
import { SessionExpired } from "../errors/session-expired"

export default function Dashboard( {onSessionExpired} ) {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
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
    }, [onSessionExpired])

    if (selectedSession) {
        return (
            <SessionPage 
                sessionId={selectedSession}
                onSessionExpired={onSessionExpired}
            />
        )
    }
    return (
        <main>
            <section>

            </section>
            <section>
                <SessionList
                sessions={sessions}
                onSelectSession={setSelectedSession}
                />
            </section>
            
        </main>
    )
    
}

function SessionList({sessions, onSelectSession}) {
    return (
        <div className="session-grid">
            {sessions.map((session) => (
                <button
                    key={session.session_id} 
                    type="button"
                    onClick={() => onSelectSession(session.session_id)}
                    className="session-card"
                 >
                    <img 
                        src={session.thumbnail_url} 
                        alt=""
                        className="session-thumbnail"
                    />
                    <div className="session-card-body">
                        <h3>{session.title}</h3>
                    </div>

                </button>
            ))}
        </div>   
    )
}