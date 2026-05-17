import { SessionExpired } from "../errors/session-expired"

async function saveSession(sessionId, latestSessionRef) {
    const latest = latestSessionRef.current
    const response = await fetch(`http://localhost:8000/api/v1/session/save-session/${encodeURIComponent(sessionId)}`, 
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include",
            body: JSON.stringify(
                {
                    title : latest.title,
                    transcript: latest.transcriptData,
                    styleData: latest.styleData
                }
            )
        }
    )
    const status = response.status
    if (response.ok) {
        return
    } else if (status === 401) {
        throw new SessionExpired("Session expired.")
    } else {
        throw new Error("Unexpected error has occurred. Please try again")
    }
}

export function autoSave(sessionId, latestSessionRef, pendingSaveRef, inFlightSaveRef) {
    const AUTOSAVE_DELAY_MS = 1500;
    const timeoutId = setTimeout(()=> {
        requestSave(sessionId, latestSessionRef, pendingSaveRef, inFlightSaveRef)
    }, AUTOSAVE_DELAY_MS)

    return timeoutId
}

export function requestSave(sessionId, latestSessionRef, pendingSaveRef, inFlightSaveRef) {
    if (inFlightSaveRef.current) {
        pendingSaveRef.current = true
        return
    }
    const latest = latestSessionRef.current;

    if (!latest?.transcriptData || !latest?.styleData) {
        return; 
    }
    inFlightSaveRef.current = true;
    pendingSaveRef.current = false;
    saveSession(sessionId, latestSessionRef)
    .catch(() => console.log("unable to save"))
    .finally(() => {
        inFlightSaveRef.current = false 
        if (pendingSaveRef.current) {
            requestSave(sessionId, latestSessionRef, pendingSaveRef, inFlightSaveRef)
        }
    })
}