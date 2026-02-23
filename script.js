// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Scroll to services function
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        const offsetTop = servicesSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Animate stats counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Modal functionality
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

function showDetails(service) {
    const serviceDetails = {
        sharepoint: {
            title: 'SharePoint Solutions',
            description: 'Our comprehensive SharePoint services help organizations leverage the full potential of Microsoft SharePoint for collaboration, document management, and business process automation.',
            features: [
                'Custom SharePoint site design and development',
                'SharePoint migration from legacy systems',
                'Workflow automation with Power Automate',
                'Integration with Microsoft 365 ecosystem',
                'Document management and version control',
                'Intranet portal development',
                'SharePoint administration and support',
                'Training and user adoption programs'
            ]
        },
        salesforce: {
            title: 'Salesforce Solutions',
            description: 'Transform your customer relationships with our expert Salesforce implementation and customization services. We help businesses maximize their CRM investment and drive growth.',
            features: [
                'Salesforce implementation and configuration',
                'Custom application development on Force.com',
                'Sales Cloud and Service Cloud setup',
                'Marketing Cloud integration',
                'Third-party system integration',
                'Lightning component development',
                'Salesforce data migration',
                'Ongoing support and optimization'
            ]
        }
    };

    const details = serviceDetails[service];
    if (details) {
        modalBody.innerHTML = `
            <h2 style="color: var(--primary-color); margin-bottom: 1rem;">${details.title}</h2>
            <p style="margin-bottom: 1.5rem; color: #555; line-height: 1.8;">${details.description}</p>
            <h3 style="margin-bottom: 1rem; color: var(--text-dark);">What We Offer:</h3>
            <ul style="list-style: none; padding: 0;">
                ${details.features.map(feature => `
                    <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: #555;">
                        <span style="position: absolute; left: 0; color: var(--secondary-color); font-weight: bold;">✓</span>
                        ${feature}
                    </li>
                `).join('')}
            </ul>
            <button onclick="scrollToContact()" style="margin-top: 2rem; background: var(--primary-color); color: white; border: none; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-size: 1rem;">
                Get Started
            </button>
        `;
        modal.style.display = 'block';
    }
}

function closeModal() {
    modal.style.display = 'none';
}

function scrollToContact() {
    closeModal();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Add navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
        navbar.style.background = 'var(--dark-bg)';
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '5px solid var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

console.log('Muthal Software website loaded successfully!');
