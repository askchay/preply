// Initialize Supabase client using config
const supabase = createClient(config.https://vyxtwyzidxjnyqlyzflu.supabase.co, config.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5eHR3eXppZHhqbnlxbHl6Zmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTI4ODgsImV4cCI6MjA1MzU2ODg4OH0.dIm6gldXHY2YsQu8InniUMtVF-cAT3BArOnbZ4mS7XI);

// Update the submitInterview function to use config
async function submitInterview() {
    // ... existing code ...

    // Send to n8n webhook
    const n8nResponse = await fetch(config.https://askchay.app.n8n.cloud/webhook-test/00daea04-9151-42d8-af03-f2922090c772, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    // ... rest of the code ...
}
