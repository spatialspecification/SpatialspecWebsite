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

    // Generate inquiry number
    function generateInquiryNumber() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    // Form Submission
    document.querySelectorAll('.contact-form-inline').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const service = this.getAttribute('data-subject');
            const inquiryNumber = generateInquiryNumber();
            const formData = new FormData(this);
            const name = formData.get('name');
            const company = formData.get('company');
            const email = formData.get('email');
            const description = formData.get('description');
            
            const subject = `${inquiryNumber}: ${service}:`;
            const body = `Inquiry: ${inquiryNumber}%0D%0AService: ${service}%0D%0AName: ${name}%0D%0ACompany: ${company}%0D%0AEmail: ${email}%0D%0A%0D%0ADescription:%0D%0A${encodeURIComponent(description)}`;
            window.location.href = `mailto:rhett@spatialspec.net?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Clear the form
            this.reset();
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-item')) {
            closeAllDropdowns();
        }
    });
});


