document.addEventListener('DOMContentLoaded', function() {
    // Helper function to close all dropdowns
    function closeAllDropdowns() {
        document.querySelectorAll('.service-dropdown').forEach(d => d.classList.remove('active'));
        document.querySelectorAll('.btn-blue').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.contact-form-inline').forEach(f => f.classList.remove('active'));
        document.querySelectorAll('.contact-btn').forEach(b => b.textContent = 'Connect');
    }

    // Service Dropdown Toggle
    document.querySelectorAll('.btn-blue[data-service]').forEach(button => {
        button.addEventListener('click', function() {
            const dropdown = this.nextElementSibling;
            const isActive = dropdown.classList.contains('active');
            
            closeAllDropdowns();
            
            if (!isActive) {
                dropdown.classList.add('active');
                this.classList.add('active');
            }
        });
    });

    // Legal Dropdown Toggle
    document.querySelectorAll('.btn-blue[data-legal]').forEach(button => {
        button.addEventListener('click', function() {
            const dropdown = this.nextElementSibling;
            const isActive = dropdown.classList.contains('active');
            
            closeAllDropdowns();
            
            if (!isActive) {
                dropdown.classList.add('active');
                this.classList.add('active');
            }
        });
    });

    // Contact Form Toggle
    document.querySelectorAll('.contact-btn').forEach(button => {
        button.addEventListener('click', function() {
            const form = this.nextElementSibling;
            const isActive = form.classList.contains('active');
            
            if (isActive) {
                form.classList.remove('active');
                this.textContent = 'Connect';
            } else {
                form.classList.add('active');
                this.textContent = 'Close';
            }
        });
    });

    // Form Submission via Google Apps Script
    document.querySelectorAll('.contact-form-inline').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
            .then(() => {
                this.reset();
                submitBtn.textContent = 'Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            })
            .catch(error => {
                submitBtn.textContent = 'Error';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-item')) {
            closeAllDropdowns();
        }
    });
});


