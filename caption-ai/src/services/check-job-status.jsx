import { SessionExpired } from "../errors/session-expired"
import { JobNotFound } from "../errors/job-not-found"

export async function checkJobStatus(jobId) {
    const response = await fetch(`http://localhost:8000/api/v1/export-status/${encodeURIComponent(jobId)}`, {
        method: "GET"
    })
    const status = response.status 
    if (response.ok) {
        const jobStatus = await response.json()
        return jobStatus.completed 
    } else if (status === 404) {
        throw new JobNotFound(`The job with job id: ${jobId} does not exist or has expired`)
    } else if (status === 401) {
        throw new SessionExpired("session expired")
    } else {
        throw new Error()
    }
}