/**
 * Spatialspec - Main JavaScript
 * Handles dropdown toggles, contact forms, and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Close all dropdowns and reset forms
     */
    function closeAllDropdowns(keepServicesMenu = false) {
        document.querySelectorAll('.service-dropdown').forEach(dropdown => {
            // Keep services menu open if specified
            if (keepServicesMenu && dropdown.classList.contains('services-menu')) {
                return;
            }
            dropdown.classList.remove('active');
        });
        document.querySelectorAll('.btn-service, .btn-legal').forEach(button => {
            // Keep services menu button active if specified
            if (keepServicesMenu && button.dataset.service === 'services-menu') {
                return;
            }
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
                const isInsideServicesMenu = this.closest('.services-menu');
                
                // If clicking inside services menu, keep it open
                if (isInsideServicesMenu) {
                    // Close other service dropdowns inside services menu, but keep services menu open
                    document.querySelectorAll('.services-menu .service-dropdown').forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });
                    document.querySelectorAll('.services-menu .btn-service').forEach(b => {
                        if (b !== this) b.classList.remove('active');
                    });
                    
                    // Toggle the clicked dropdown
                    dropdown.classList.toggle('active', !isActive);
                    this.classList.toggle('active', !isActive);
                } else {
                    closeAllDropdowns();
                    
                    if (!isActive) {
                        dropdown.classList.add('active');
                        this.classList.add('active');
                    }
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
    document.querySelectorAll('.contact-form select[name="entry.846544278"]').forEach(select => {
        select.addEventListener('change', function() {
            this.classList.add('has-value');
        });
    });

    /**
     * Form submission handler - submits to Google Forms
     */
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            // Allow the form to submit to Google Forms via hidden iframe
            // Show "Sent!" confirmation
            const submitBtn = this.querySelector('.btn-submit');
            submitBtn.textContent = 'Sent!';
            submitBtn.classList.add('sent');
            
            // Reset form after a short delay to allow submission
            setTimeout(() => {
                this.reset();
                
                // Reset service dropdown styling
                const serviceSelect = this.querySelector('select[name="entry.846544278"]');
                if (serviceSelect) {
                    serviceSelect.classList.remove('has-value');
                }
            }, 100);
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = 'Send';
                submitBtn.classList.remove('sent');
            }, 2000);
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
