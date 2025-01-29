npm install @supabase/supabase-js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vyxtwyzidxjnyqlyzflu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5eHR3eXppZHhqbnlxbHl6Zmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTI4ODgsImV4cCI6MjA1MzU2ODg4OH0.dIm6gldXHY2YsQu8InniUMtVF-cAT3BArOnbZ4mS7XI'
const supabase = createClient(supabaseUrl, supabaseKey)

async function saveToSupabase(data) {
    try {
        const { data: result, error } = await supabase
            .from('interview_submissions')
            .insert([
                {
                    name: data.name,
                    email: data.email,
                    company: data.company,
                    job_description: data.jd,
                    category: data.category,
                    answers: data.answers,
                    submitted_at: new Date().toISOString()
                }
            ])

        if (error) throw error
        return result
    } catch (error) {
        console.error('Error saving to Supabase:', error)
        throw error
    }
}

// Modify the submitInterview function
async function submitInterview() {
    const payload = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        company: document.getElementById('company').value,
        jd: document.getElementById('jd').value,
        category: document.getElementById('category').value,
        answers: []
    };

    // Collect answers
    const category = payload.category;
    questions[category].forEach((q, i) => {
        const answer = document.getElementById(`answer-${i}`).value;
        payload.answers.push({ question: q, answer });
    });

    try {
        // Save to Supabase
        await saveToSupabase(payload);

        // Send to n8n webhook
        const n8nResponse = await fetch('https://askchay.app.n8n.cloud/webhook-test/00daea04-9151-42d8-af03-f2922090c772', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const response = await n8nResponse.json();
        showFeedback(response);
        console.log('Submission successful:', response);
    } catch (error) {
        console.error('Submission failed:', error);
    }
}