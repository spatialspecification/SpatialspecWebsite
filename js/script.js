/**
 * Spatialspec - Main JavaScript
 * Handles dropdown toggles, contact forms, and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Prevent scrollbar during page load animations
    // Enable scrolling after animations complete (1.5s to account for all fadeUp animations)
    setTimeout(function() {
        document.documentElement.classList.add('loaded');
    }, 1500);
    
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
        const siteFooter = document.querySelector('.site-footer');
        if (connectPage && navButtons) {
            const isMobile = window.innerWidth <= 600;
            
            connectPage.classList.remove('show');
            // Reset transform immediately to prevent background shift
            connectPage.style.transform = '';
            connectPage.style.opacity = '0';
            
            // Ensure footer is always visible
            if (siteFooter) {
                siteFooter.style.display = '';
                siteFooter.style.visibility = 'visible';
                siteFooter.style.position = 'fixed';
                siteFooter.style.bottom = '0';
            }
            
            // Restore body overflow and position on mobile
            if (isMobile) {
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                document.body.style.overflow = '';
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            }
            
            // Hide after animation completes
            setTimeout(() => {
                connectPage.style.display = 'none';
            }, 300);
            navButtons.style.display = 'flex';
            if (connectButton) {
                connectButton.classList.remove('active');
            }
            // Don't scroll to top to prevent footer jump
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
                
                // Check if mobile device
                const isMobile = window.innerWidth <= 600;
                
                // Prevent background jump on mobile by preserving scroll position
                const currentScrollY = window.scrollY;
                
                // Get Connect button position for popup animation (desktop only)
                let startX = 0;
                let startY = 0;
                if (!isMobile) {
                    const connectButtonRect = this.getBoundingClientRect();
                    const buttonCenterX = connectButtonRect.left + (connectButtonRect.width / 2);
                    const buttonCenterY = connectButtonRect.top + (connectButtonRect.height / 2);
                    const viewportCenterX = window.innerWidth / 2;
                    const viewportCenterY = window.innerHeight / 2;
                    
                    // Calculate transform to animate from button position to center
                    startX = buttonCenterX - viewportCenterX;
                    startY = buttonCenterY - viewportCenterY;
                }
                
                // Reset opacity, position, and ensure display is set
                
                if (isMobile) {
                    // On mobile, use fade-in only (no transform) to prevent background jump
                    connectPage.style.opacity = '0';
                    connectPage.style.transform = '';
                    connectPage.style.display = 'flex';
                    // Lock scroll position to prevent jump
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                    document.body.style.top = `-${currentScrollY}px`;
                } else {
                    // On desktop, use popup animation
                    connectPage.style.opacity = '0';
                    connectPage.style.transform = `translate(${startX}px, ${startY}px) scale(0.3)`;
                    connectPage.style.display = 'flex';
                }
                
                // Force reflow to ensure animation starts from beginning
                connectPage.offsetHeight;
                
                // Remove show class if present
                connectPage.classList.remove('show');
                // Add show class to trigger animation
                setTimeout(() => {
                    connectPage.classList.add('show');
                    // Only auto-focus on desktop to prevent mobile jump
                    if (!isMobile) {
                        const nameInput = connectPage.querySelector('input[name="name"]');
                        if (nameInput) {
                            setTimeout(() => {
                                nameInput.focus();
                            }, 100);
                        }
                    }
                }, 10);
                
                // Don't scroll to prevent footer/background jump
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
     * Sync Connect button position with footer
     */
    const siteFooter = document.querySelector('.site-footer');
    const connectButton = document.querySelector('.btn-connect-float');
    
    function updateConnectButtonPosition() {
        if (connectButton && siteFooter) {
            const footerRect = siteFooter.getBoundingClientRect();
            // Position button so its bottom aligns with footer's top
            const footerTop = window.innerHeight - footerRect.top;
            connectButton.style.bottom = footerTop + 'px';
        }
    }
    
    // Initial position update
    setTimeout(updateConnectButtonPosition, 100);
    
    // Update on window resize (throttled)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateConnectButtonPosition, 150);
    });
});
