// Initialize Supabase client using config
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

// Update the submitInterview function to use config
async function submitInterview() {
    // ... existing code ...

    // Send to n8n webhook
    const n8nResponse = await fetch(config.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    // ... rest of the code ...
}
