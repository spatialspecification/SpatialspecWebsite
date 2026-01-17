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
    setupDropdownToggle('.btn-footer-link');

    /**
     * Legal page toggle for footer Legal button
     */
    document.querySelectorAll('.btn-footer-link[data-legal="legal"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const legalPage = document.getElementById('legal-page');
            const navButtons = document.querySelector('.hero-buttons');
            if (legalPage && navButtons) {
                // Close all dropdowns
                closeAllDropdowns();
                // Hide nav and show legal page
                navButtons.style.display = 'none';
                legalPage.style.display = 'flex';
                legalPage.style.opacity = '1';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    /**
     * Close legal page function (called from HTML)
     */
    window.closeLegalPage = function() {
        const legalPage = document.getElementById('legal-page');
        const navButtons = document.querySelector('.hero-buttons');
        if (legalPage && navButtons) {
            legalPage.style.display = 'none';
            navButtons.style.display = 'flex';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    /**
     * Contact form toggle
     */
    document.querySelectorAll('.btn-connect').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            const form = dropdown ? dropdown.querySelector('.contact-form') : null;
            
            if (dropdown) {
                const isActive = dropdown.classList.contains('active');
                dropdown.classList.toggle('active', !isActive);
                this.classList.toggle('active', !isActive);
                
                // Toggle form visibility within dropdown
                if (form) {
                    form.classList.toggle('active', !isActive);
                }
                
                this.textContent = isActive ? 'Connect' : 'Close';
            }
        });
    });

    /**
     * Service dropdown styling - add class when value selected
     */
    document.querySelectorAll('.contact-form select[name="service"]').forEach(select => {
        // Check initial state
        if (select.value && select.value !== '') {
            select.classList.add('has-value');
        }
        
        // Update on change
        select.addEventListener('change', function() {
            if (this.value && this.value !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });

    /**
     * Form submission handler - submits to Web3Forms
     */
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            // Show "Sent!" confirmation
            submitBtn.textContent = 'Sent!';
            submitBtn.classList.add('sent');
            submitBtn.disabled = true;
            
            // Submit form to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Reset form
                this.reset();
                
                // Reset service dropdown styling
                const serviceSelect = this.querySelector('select[name="service"]');
                if (serviceSelect) {
                    serviceSelect.classList.remove('has-value');
                }
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('sent');
                    submitBtn.disabled = false;
                }, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
                // Reset button even on error
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('sent');
                submitBtn.disabled = false;
            });
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
