// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
function initTheme() {
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

// Update theme icon
function updateThemeIcon() {
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');
    
    if (currentTheme === 'dark') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    } else {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingTexts = document.querySelectorAll('.typing-text');
    let currentIndex = 0;
    
    function typeText() {
        // Hide all texts
        typingTexts.forEach(text => {
            text.classList.remove('active');
        });
        
        // Show current text
        if (typingTexts[currentIndex]) {
            typingTexts[currentIndex].classList.add('active');
        }
        
        // Move to next text
        currentIndex = (currentIndex + 1) % typingTexts.length;
    }
    
    // Start typing animation
    typeText();
    setInterval(typeText, 3000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Statistics Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current);
                }, 16);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Enhanced Scroll Animations with Advanced Effects
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animated class
                element.classList.add('animated');
                
                // Determine animation type based on element
                let animationType = 'fadeInUp';
                
                if (element.classList.contains('skill-card')) {
                    animationType = Math.random() > 0.5 ? 'slideInLeft' : 'slideInRight';
                } else if (element.classList.contains('service-card')) {
                    animationType = Math.random() > 0.5 ? 'zoomIn' : 'flipInX';
                } else if (element.classList.contains('project-card')) {
                    animationType = Math.random() > 0.5 ? 'scaleIn' : 'blurIn';
                } else if (element.classList.contains('testimonial-card')) {
                    animationType = Math.random() > 0.5 ? 'slideInRight' : 'bounceIn';
                } else if (element.classList.contains('timeline-item')) {
                    animationType = Math.random() > 0.5 ? 'slideInLeft' : 'slideInRight';
                } else if (element.classList.contains('stat-item')) {
                    animationType = 'bounceIn';
                } else if (element.classList.contains('section-title')) {
                    animationType = 'textShine';
                } else if (element.classList.contains('about-content')) {
                    animationType = 'fadeInUp';
                }
                
                // Apply animation
                element.style.animation = `${animationType} 0.8s ease forwards`;
                
                // Add shimmer effect to certain elements
                if (element.classList.contains('skill-card') || element.classList.contains('service-card')) {
                    setTimeout(() => {
                        element.classList.add('animate-shimmer');
                        setTimeout(() => element.classList.remove('animate-shimmer'), 2000);
                    }, 800);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .service-card, .testimonial-card, .about-content, .stats-grid, .section-title, .stat-item, .comment-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Enhanced Skill Cards with Advanced Effects
function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02) rotate(2deg)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            
            // Add glow effect
            card.style.animation = 'glow 1s ease-in-out infinite alternate';
            
            // Animate skill icon
            const icon = card.querySelector('.skill-icon');
            if (icon) {
                icon.style.animation = 'rotate 2s linear infinite';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            card.style.boxShadow = '';
            card.style.animation = '';
            
            const icon = card.querySelector('.skill-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
        
        // Add click effect
        card.addEventListener('click', () => {
            card.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 500);
        });
    });
}

// Enhanced Project Cards with Advanced Effects
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.15}s`;
        
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.03)';
            card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
            
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.animation = 'blurIn 0.3s ease forwards';
            }
            
            // Animate project image
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.animation = 'morphing 3s ease-in-out infinite';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
            
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.animation = '';
            }
            
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.animation = '';
            }
        });
        
        // Add click effect
        card.addEventListener('click', () => {
            card.style.animation = 'bounceIn 0.6s ease-in-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
    });
}

// Enhanced Service Cards with Advanced Effects
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.animation = 'glow 1s ease-in-out infinite alternate';
            }
            
            // Animate service features
            const features = card.querySelectorAll('.service-features li');
            features.forEach((feature, i) => {
                setTimeout(() => {
                    feature.style.animation = 'slideInLeft 0.3s ease forwards';
                }, i * 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
            
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.animation = '';
            }
            
            const features = card.querySelectorAll('.service-features li');
            features.forEach(feature => {
                feature.style.animation = '';
            });
        });
        
        // Add click effect
        card.addEventListener('click', () => {
            card.style.animation = 'swing 0.6s ease-in-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
    });
}

// Enhanced Testimonials Slider with Advanced Effects
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            if (i === index) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
                
                // Add glow effect to active testimonial
                card.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.2)';
            } else {
                card.style.opacity = '0.5';
                card.style.transform = 'translateY(20px) scale(0.95)';
                card.style.animation = '';
                card.style.boxShadow = '';
            }
        });
    }
    
    // Auto-rotate testimonials with enhanced timing
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 6000);
    
    // Show first testimonial
    showTestimonial(0);
    
    // Add click to navigate
    testimonialCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
}

// Enhanced Statistics Counter with Advanced Effects
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2500; // 2.5 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                // Add bounce effect to stat item
                const statItem = entry.target.closest('.stat-item');
                if (statItem) {
                    statItem.style.animation = 'bounceIn 0.8s ease forwards';
                }
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                        
                        // Add completion effect
                        entry.target.style.animation = 'glow 1s ease-in-out';
                        setTimeout(() => {
                            entry.target.style.animation = '';
                        }, 1000);
                    }
                    entry.target.textContent = Math.floor(current);
                }, 16);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Enhanced Button Animations with Ripple Effect
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple class
        button.classList.add('ripple');
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
        });
        
        // Add click effect
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add shake effect
            button.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        });
    });
}

// Enhanced Social Links with Advanced Effects
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        // Add staggered animation delay
        link.style.animationDelay = `${index * 0.1}s`;
        
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1) rotate(10deg)';
            link.style.animation = 'glow 1s ease-in-out infinite alternate';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            link.style.animation = '';
        });
        
        // Add click effect
        link.addEventListener('click', () => {
            link.style.animation = 'bounceIn 0.6s ease-in-out';
            setTimeout(() => {
                link.style.animation = '';
            }, 600);
        });
    });
}

// Enhanced Section Titles with Advanced Effects
function initSectionTitles() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.animation = 'textShine 2s ease-in-out';
                
                // Add shimmer effect
                setTimeout(() => {
                    entry.target.classList.add('animate-shimmer');
                    setTimeout(() => {
                        entry.target.classList.remove('animate-shimmer');
                    }, 2000);
                }, 2000);
            }
        });
    }, { threshold: 0.5 });
    
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
}

// Enhanced Timeline with Advanced Effects
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.animationDelay = `${index * 0.2}s`;
        
        item.addEventListener('mouseenter', () => {
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.animation = 'pulse 1s ease-in-out infinite';
            }
            
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.transform = 'scale(1.02)';
                content.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.animation = '';
            }
            
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.transform = 'scale(1)';
                content.style.boxShadow = '';
            }
        });
    });
}

// Enhanced Comment System with Advanced Effects
function initCommentSystem() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(commentForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const comment = formData.get('comment');
            
            // Create new comment element with enhanced styling
            const newComment = document.createElement('div');
            newComment.className = 'comment-item animate-on-scroll';
            newComment.innerHTML = `
                <div class="comment-avatar">
                    <img src="https://via.placeholder.com/50x50/${getRandomColor()}/ffffff?text=${name.charAt(0).toUpperCase()}" alt="${name}"/>
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>${name}</h4>
                        <span class="comment-date">${new Date().toLocaleDateString()}</span>
                    </div>
                    <p>${comment}</p>
                </div>
            `;
            
            // Add animation
            newComment.style.opacity = '0';
            newComment.style.transform = 'translateY(20px)';
            
            // Add to list
            commentsList.insertBefore(newComment, commentsList.firstChild);
            
            // Animate in with enhanced effect
            setTimeout(() => {
                newComment.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                newComment.style.opacity = '1';
                newComment.style.transform = 'translateY(0)';
                newComment.style.animation = 'bounceIn 0.8s ease forwards';
            }, 100);
            
            // Reset form with animation
            const formGroups = commentForm.querySelectorAll('.form-group');
            formGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        group.style.animation = '';
                    }, 500);
                }, index * 100);
            });
            
            setTimeout(() => {
                commentForm.reset();
            }, 500);
            
            // Show success message
            showNotification('Comment posted successfully!', 'success');
        });
    }
}

// Enhanced Contact Form with Advanced Effects
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formGroups = contactForm.querySelectorAll('.form-group');
        
        // Add focus effects
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (input) {
                input.addEventListener('focus', () => {
                    group.style.animation = 'glow 1s ease-in-out';
                });
                
                input.addEventListener('blur', () => {
                    group.style.animation = '';
                });
            }
        });
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state with animation
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.animation = 'glow 1s ease-in-out infinite alternate';
            
            try {
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                // Create email content
                const emailContent = `
                    Name: ${name}
                    Email: ${email}
                    Subject: ${subject}
                    
                    Message:
                    ${message}
                `;
                
                // Simulate email sending
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Open email client
                const mailtoLink = `mailto:kodelaakshay08@gmail.com?subject=Portfolio Contact: ${subject}&body=${encodeURIComponent(emailContent)}`;
                window.open(mailtoLink);
                
                // Show success message
                showNotification('Message sent successfully! Check your email client.', 'success');
                
                // Reset form with animation
                formGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, index * 100);
                });
                
                setTimeout(() => {
                    contactForm.reset();
                    formGroups.forEach(group => {
                        group.style.animation = '';
                    });
                }, 500);
                
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.animation = '';
            }
        });
    }
}

// Utility Functions
function getRandomColor() {
    const colors = ['2563eb', '10b981', 'f59e0b', 'ef4444', '8b5cf6'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Enhanced Parallax Effect
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    const shapes = document.querySelectorAll('.shape');
    const profileImage = document.querySelector('.profile-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Enhanced parallax for shapes
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const rotation = scrolled * 0.1 * (index + 1);
            shape.style.transform = `translateY(${rate * speed}px) rotate(${rotation}deg)`;
        });
        
        // Parallax for profile image
        if (profileImage) {
            const imageRate = scrolled * -0.3;
            profileImage.style.transform = `translateY(${imageRate}px)`;
        }
        
        // Parallax for hero text
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            const textRate = scrolled * -0.2;
            heroText.style.transform = `translateY(${textRate}px)`;
        }
    });
}

// Enhanced Active Navigation Highlighting
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.animation = 'glow 1s ease-in-out';
                setTimeout(() => {
                    link.style.animation = '';
                }, 1000);
            }
        });
    });
}

// Enhanced Theme Toggle with Animation
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        // Add click animation
        themeToggle.style.animation = 'rotate 0.6s ease-in-out';
        setTimeout(() => {
            themeToggle.style.animation = '';
        }, 600);
        
        toggleTheme();
    });
}

// Enhanced Mobile Menu with Animation
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Add animation to hamburger
        hamburger.style.animation = 'bounceIn 0.6s ease-in-out';
        setTimeout(() => {
            hamburger.style.animation = '';
        }, 600);
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Add animation to clicked link
            link.style.animation = 'glow 0.5s ease-in-out';
            setTimeout(() => {
                link.style.animation = '';
            }, 500);
        });
    });
}

// Initialize all enhanced functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypingAnimation();
    initSmoothScrolling();
    initNavbarScroll();
    initMobileMenu();
    initStatsCounter();
    initScrollAnimations();
    initSkillCards();
    initProjectCards();
    initServiceCards();
    initTestimonialsSlider();
    initCommentSystem();
    initContactForm();
    initParallax();
    initActiveNavHighlight();
    initButtonAnimations();
    initSocialLinks();
    initSectionTitles();
    initTimeline();
    initThemeToggle();
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add active class to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Add scroll-triggered animations for additional elements
    const additionalElements = document.querySelectorAll('.contact-item, .footer-section, .about-image');
    additionalElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
});

// Add CSS for active nav link and enhanced animations
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .service-icon {
        transition: transform 0.3s ease;
    }
    
    .btn {
        transition: all 0.3s ease !important;
    }
    
    .skill-card::before {
        transition: transform 0.3s ease;
    }
    
    .testimonial-card {
        transition: all 0.3s ease;
    }
    
    .blog-image img {
        transition: transform 0.3s ease;
    }
    
    .comment-item {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style); 