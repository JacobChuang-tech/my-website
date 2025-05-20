// Handle newsletter subscription form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscribe-form');
    const message = document.getElementById('form-message');
    
    // Display success message if redirected after successful form submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        message.textContent = 'Thank you for subscribing!';
        
        // Set message in the appropriate language
        const currentPath = window.location.pathname;
        if (currentPath.includes('/jp/')) {
            message.textContent = 'ご登録ありがとうございます！';
        } else if (currentPath.includes('/zh-tw/')) {
            message.textContent = '感謝您的訂閱！';
        } else {
            message.textContent = 'Thank you for subscribing!';
        }
    }
    
    // Handle form submission locally (for testing)
    if (form) {
        form.addEventListener('submit', function(e) {
            // When testing locally, Netlify forms don't work, so we'll show a simulation
            if (!window.location.hostname.includes('netlify')) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                console.log('Email submitted:', email);
                
                // Set success message in the appropriate language
                const currentPath = window.location.pathname;
                if (currentPath.includes('/jp/')) {
                    message.textContent = 'ご登録ありがとうございます！';
                } else if (currentPath.includes('/zh-tw/')) {
                    message.textContent = '感謝您的訂閱！';
                } else {
                    message.textContent = 'Thank you for subscribing!';
                }
                
                message.style.color = 'green';
                form.reset();
            }
        });
    }
});