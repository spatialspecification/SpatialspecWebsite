document.addEventListener('DOMContentLoaded', function() {
    
    // Close all dropdowns and reset forms
    function closeAllDropdowns() {
        document.querySelectorAll('.service-dropdown').forEach(d => d.classList.remove('active'));
        document.querySelectorAll('.btn-service, .btn-legal').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.contact-form').forEach(f => f.classList.remove('active'));
        document.querySelectorAll('.btn-connect').forEach(b => b.textContent = 'Connect');
    }

    // Toggle dropdown for service and legal buttons
    function setupDropdownToggle(selector) {
        document.querySelectorAll(selector).forEach(button => {
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
    }

    setupDropdownToggle('.btn-service');
    setupDropdownToggle('.btn-legal');

    // Contact form toggle
    document.querySelectorAll('.btn-connect').forEach(button => {
        button.addEventListener('click', function() {
            const form = this.nextElementSibling;
            const isActive = form.classList.contains('active');
            
            form.classList.toggle('active', !isActive);
            this.textContent = isActive ? 'Connect' : 'Close';
        });
    });

    // Generate inquiry number
    function generateInquiryNumber() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    // Form submission via mailto
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const service = this.dataset.subject;
            const inquiryNumber = generateInquiryNumber();
            
            const subject = `${inquiryNumber}: ${service}`;
            const body = [
                `Inquiry: ${inquiryNumber}`,
                `Service: ${service}`,
                `Name: ${formData.get('name')}`,
                `Company: ${formData.get('company') || 'N/A'}`,
                `Email: ${formData.get('email')}`,
                '',
                'Description:',
                formData.get('description') || 'N/A'
            ].join('\r\n');
            
            window.location.href = `mailto:info@spatialspec.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-item')) {
            closeAllDropdowns();
        }
    });
});
