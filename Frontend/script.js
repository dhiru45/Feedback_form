document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('complaintForm');
    const submitBtn = document.querySelector('.submit-btn');
    const statusMessage = document.getElementById('statusMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Form fields
        const name = document.getElementById('name').value.trim();
        const city = document.getElementById('city').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const complaint = document.getElementById('complaint').value.trim();

        // Basic validation
        if (!name || !city || !mobile || !complaint) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        const formData = {
            name,
            city,
            mobile,
            complaint,
            timestamp: new Date().toISOString()
        };

        // UI Feedback: Start loading
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        hideMessage();

        try {
            // Simulate sending data to backend (dummy-api)
            // We'll use JSONPlaceholder as a dummy API that accepts POST requests
            // In a real application, you would replace this URL with your actual backend endpoint
            // e.g., fetch('http://localhost:3000/api/complaints', ...)

            // Simulating a slightly longer API latency for the loading animation effect
            await new Promise(resolve => setTimeout(resolve, 1200));

            const response = await fetch('http://localhost:3000/api/complaints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Server responded with an error');
            }

            const result = await response.json();
            console.log('Complaint submitted successfully:', result);

            // Show success message
            showMessage('Your complaint has been submitted successfully!', 'success');

        } catch (error) {
            console.error('Error submitting complaint:', error);
            showMessage('Failed to submit complaint. Please try again later.', 'error');
        } finally {
            // UI Feedback: Stop loading
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    function showMessage(text, type) {
        statusMessage.textContent = text;
        statusMessage.className = `status-message show ${type}`;
    }

    function hideMessage() {
        statusMessage.className = 'status-message';
        statusMessage.textContent = '';
    }
});
