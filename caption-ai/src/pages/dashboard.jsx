import {useState, useEffect} from "react"
import { fetchSessions } from "../services/fetch-sessions.jsx";
import SessionPage from './session-page.jsx'
import { SessionExpired } from "../errors/session-expired"
import { createSession } from "../services/create-session.jsx";
import { deleteSession } from "../services/delete-session.jsx";
import { SessionCountLimit } from "../errors/session-count.jsx";

export default function Dashboard( {onSessionExpired} ) {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [error, setError] = useState(null);

    async function loadSessions() {
            try {
                const data = await fetchSessions()
                setSessions(data)
            }
            catch (err) {
                if (err instanceof SessionExpired) {
                    onSessionExpired()
                    return
                } 
                setError({
                    type: "sessions-load",
                    message: "Failed to load your sessions. Please try again."
                })
            }
    }

    useEffect(()=> {
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

    async function handleDeleteSession(sessionId) {
        setError(null);
        try {
            await deleteSession(sessionId)
            await loadSessions()

        } catch (err) {
            if (err instanceof SessionExpired) {
                onSessionExpired()
                return
            }
            setError({
                type: "delete-session",
                message: "Failed to delete the session. Please try again."
            })
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
                    onDeleteSession={handleDeleteSession}
                />
            </section>
            
        </main>
    )
    
}

function SessionList({sessions, onSelectSession, onDeleteSession}) {
    return (
        <div className="session-grid">
            {sessions.map((session) => (
                <article key={session.session_id} className="session-card">
                    <img 
                        src={session.thumbnail_url} 
                        alt=""
                        className="session-thumbnail"
                    />
                    <div className="session-card-body">
                        <h3>{session.title}</h3>
                        <button
                            type="button"
                            onClick={() => onSelectSession(session.session_id)}
                        >
                            Open
                        </button>
                        <button
                            type="button"
                            onClick={() => onDeleteSession(session.session_id)}
                        >
                            Delete
                        </button>
                    </div>

                </article>
            ))}
        </div>   
    )
}
