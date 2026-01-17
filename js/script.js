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
    setupDropdownToggle('.btn-footer-link');

    /**
     * Close legal page function
     */
    function closeLegalPage() {
        const legalPage = document.getElementById('legal-page');
        const navButtons = document.querySelector('.hero-buttons');
        const legalButton = document.querySelector('.btn-footer-text[data-legal="legal"]');
        if (legalPage && navButtons) {
            legalPage.classList.remove('show');
            legalPage.style.display = 'none';
            legalPage.style.opacity = '0';
            navButtons.style.display = 'flex';
            if (legalButton) {
                legalButton.classList.remove('active');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Close connect page function
     */
    function closeConnectPage() {
        const connectPage = document.getElementById('connect-page');
        const navButtons = document.querySelector('.hero-buttons');
        const connectButton = document.querySelector('.btn-connect-footer-link');
        if (connectPage && navButtons) {
            connectPage.classList.remove('show');
            connectPage.style.display = 'none';
            connectPage.style.opacity = '0';
            navButtons.style.display = 'flex';
            if (connectButton) {
                connectButton.classList.remove('active');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Legal page toggle for footer Legal button
     */
    document.querySelectorAll('.btn-footer-text[data-legal="legal"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const legalPage = document.getElementById('legal-page');
            const navButtons = document.querySelector('.hero-buttons');
            if (legalPage && navButtons) {
                // Check if legal page is already showing
                const isLegalPageShowing = legalPage.classList.contains('show') && legalPage.style.display !== 'none';
                
                if (isLegalPageShowing) {
                    // If already showing, toggle back to main body
                    closeLegalPage();
                    return;
                }
                
                // Close connect page if open
                closeConnectPage();
                // Close all dropdowns
                closeAllDropdowns();
                // Add active class to Legal button
                this.classList.add('active');
                // Hide nav and show legal page
                navButtons.style.display = 'none';
                // Reset opacity and ensure display is set
                legalPage.style.opacity = '0';
                legalPage.style.display = 'flex';
                // Force reflow to ensure animation starts from beginning
                legalPage.offsetHeight;
                // Remove show class if present
                legalPage.classList.remove('show');
                // Add show class to trigger animation
                setTimeout(() => {
                    legalPage.classList.add('show');
                }, 10);
                window.scrollTo({ top: 0, behavior: 'smooth'                 });
            }
        });
    });

    /**
     * Connect page toggle for footer Connect button
     */
    document.querySelectorAll('.btn-connect-footer-link').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const connectPage = document.getElementById('connect-page');
            const navButtons = document.querySelector('.hero-buttons');
            if (connectPage && navButtons) {
                // Check if connect page is already showing
                const isConnectPageShowing = connectPage.classList.contains('show') && connectPage.style.display !== 'none';
                
                if (isConnectPageShowing) {
                    // If already showing, toggle back to main body
                    closeConnectPage();
                    return;
                }
                
                // Close legal page if open
                closeLegalPage();
                // Close all dropdowns
                closeAllDropdowns();
                // Add active class to Connect button
                this.classList.add('active');
                // Hide nav and show connect page
                navButtons.style.display = 'none';
                // Reset opacity and ensure display is set
                connectPage.style.opacity = '0';
                connectPage.style.display = 'flex';
                // Force reflow to ensure animation starts from beginning
                connectPage.offsetHeight;
                // Remove show class if present
                connectPage.classList.remove('show');
                // Add show class to trigger animation
                setTimeout(() => {
                    connectPage.classList.add('show');
                }, 10);
                window.scrollTo({ top: 0, behavior: 'smooth' });
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

    /**
     * Show footer on scroll down
     */
    const siteFooter = document.querySelector('.site-footer');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            // Show footer when scrolled down
            if (siteFooter) {
                siteFooter.classList.add('visible');
            }
        } else {
            // Hide footer when at top
            if (siteFooter) {
                siteFooter.classList.remove('visible');
            }
        }
        
        lastScrollTop = scrollTop;
    });
});
