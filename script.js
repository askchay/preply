import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
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
        const n8nResponse = await fetch('https://askchay.app.n8n.cloud/webhook/2b7ccf76-a1e0-4c2f-8622-c107a07b4168', {
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