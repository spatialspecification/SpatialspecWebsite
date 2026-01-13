/**
 * Spatialspec - Main JavaScript
 * Handles dropdown toggles, contact forms, and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Close all dropdowns and reset forms
     */
    function closeAllDropdowns() {
        document.querySelectorAll('.service-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        document.querySelectorAll('.btn-service, .btn-legal').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelectorAll('.contact-form').forEach(form => {
            form.classList.remove('active');
        });
        document.querySelectorAll('.btn-connect').forEach(button => {
            button.textContent = 'Connect';
        });
    }

    /**
     * Setup dropdown toggle functionality
     * @param {string} selector - CSS selector for buttons
     */
    function setupDropdownToggle(selector) {
        document.querySelectorAll(selector).forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
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

    // Initialize dropdown toggles
    setupDropdownToggle('.btn-service');
    setupDropdownToggle('.btn-legal');

    /**
     * Contact form toggle
     */
    document.querySelectorAll('.btn-connect').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const form = this.nextElementSibling;
            const isActive = form.classList.contains('active');
            
            form.classList.toggle('active', !isActive);
            this.textContent = isActive ? 'Connect' : 'Close';
        });
    });

    /**
     * Service dropdown styling - add class when value selected
     */
    document.querySelectorAll('.contact-form select[name="service"]').forEach(select => {
        select.addEventListener('change', function() {
            this.classList.add('has-value');
        });
    });

    /**
     * Generate unique inquiry number
     * @returns {number} 4-digit inquiry number
     */
    function generateInquiryNumber() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    /**
     * Form submission handler - sends via mailto
     */
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const inquiryNumber = generateInquiryNumber();
            const selectedService = formData.get('service');
            const userDescription = formData.get('description') || '';
            
            // Build description with service prefix if selected
            let fullDescription = userDescription;
            if (selectedService) {
                fullDescription = `[${selectedService}] ${userDescription}`.trim();
            }
            
            const subject = `${inquiryNumber}: Inquiry`;
            const body = [
                `Inquiry Number: ${inquiryNumber}`,
                `Service: ${selectedService || 'General'}`,
                ``,
                `Name: ${formData.get('name')}`,
                `Company: ${formData.get('company') || 'N/A'}`,
                `Email: ${formData.get('email')}`,
                ``,
                `Description:`,
                fullDescription || 'No description provided'
            ].join('\r\n');
            
            // Open email client
            window.location.href = `mailto:info@spatialspec.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Reset form after submission
            this.reset();
        });
    });

    /**
     * Close dropdowns when clicking outside
     */
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-item')) {
            closeAllDropdowns();
        }
    });

    /**
     * Keyboard accessibility - close on Escape
     */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
});
