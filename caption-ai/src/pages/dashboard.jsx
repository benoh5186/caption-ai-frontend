import {useState, useEffect} from "react"
import { fetchSessions } from "../services/fetch-sessions.jsx";
import SessionPage from './session-page.jsx'
import { SessionExpired } from "../errors/session-expired"
import { createSession } from "../services/create-session.jsx";
import { SessionCountLimit } from "../errors/session-count.jsx";

export default function Dashboard( {onSessionExpired} ) {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [error, setError] = useState(null);

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
                setError({
                    type: "sessions-load",
                    message: "Failed to load your sessions. Please try again."
                })
                return
            }
        }
        loadSessions()
    }, [onSessionExpired])

    async function handleCreateSession() {
        setError(null);
        try {
            const sessionId = await createSession()
            setSelectedSession(sessionId)
        } catch (err) {
            if (err instanceof SessionExpired) {
                onSessionExpired()
            } else if (err instanceof SessionCountLimit) {
                setError({
                    type: "session-limit",
                    message: "You have reached the maximum number of sessions."
                })
            } else {
                setError({
                    type: "create-session",
                    message: "Something went wrong while creating a session. Please try again."
                })
            }

        }
    }



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
                <button type="button" onClick={handleCreateSession}>
                    Create new session
                </button>

                {error && (
                    <p role="alert">
                        {error.message}
                    </p>
                )}

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
