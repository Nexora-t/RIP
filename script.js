// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Smooth scrolling for navigation links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Header background on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "none";
    }
});

// Typing animation
const typingText = document.querySelector(".typing-text");
const words = ["Creative", "Innovative", "Professional", "Passionate"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    const typingSpeed = isDeleting ? 100 : 200;
    setTimeout(typeWriter, typingSpeed);
}

// Start typing animation
setTimeout(typeWriter, 1000);

// Skill bars animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px"
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll(".skill-progress");
            skillBars.forEach(bar => {
                const width = bar.getAttribute("data-width");
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector(".skills");
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll(".stat-number");
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (stat.textContent.includes("%") ? "%" : "+");
                }, 50);
            });
        }
    });
}, observerOptions);

const aboutSection = document.querySelector(".about");
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Logo modal functionality
const logoCards = document.querySelectorAll(".logo-card");
const modal = document.getElementById("logoModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.querySelector(".close");

const logoData = {
    1: {
        title: "Integrated Logo",
        description: "This logo combines programming and graphic design symbols in a creative way, where the curly braces represent the world of programming, while the color palette and brush represent the world of graphic design."
    },
    2: {
        title: "Creative Balance",
        description: "This logo represents the perfect balance between technology and art, where the programming symbol and color palette appear on a scale, reflecting the harmony between the two worlds."
    },
    3: {
        title: "Digital Quill",
        description: "This design combines the artistic quill with programming symbols, creating a powerful symbol that expresses the integration of artistic creativity with modern technology."
    },
    4: {
        title: "Worlds Converge",
        description: "This logo represents the convergence of the programming and design worlds in a harmonious geometric shape, where symbols and colors intertwine to form an integrated creative unit."
    },
    5: {
        title: "Luminous Creativity",
        description: "This design uses abstract shapes and dynamic lines to represent innovation and creativity, with a light bulb in the center symbolizing bright ideas."
    }
};

logoCards.forEach(card => {
    card.addEventListener("click", () => {
        const logoNumber = card.getAttribute("data-logo");
        const logoInfo = logoData[logoNumber];
        const imageSrc = card.querySelector("img").src;
        
        modalImage.src = imageSrc;
        modalTitle.textContent = logoInfo.title;
        modalDescription.textContent = logoInfo.description;
        modal.style.display = "block";
        
        // Add animation
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
    });
});

closeModal.addEventListener("click", () => {
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector("button[type=\"submit\"]");
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = "<i class=\"fas fa-spinner fa-spin\"></i> Sending...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert("Your message has been sent successfully! I will contact you soon.");
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Parallax effect for floating elements
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-element");
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add scroll animations for sections
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

// Apply animation to all sections
document.querySelectorAll("section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    animateOnScroll.observe(section);
});

// Add hover effects for project cards
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
    });
});

// Add loading animation
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});

// Add active navigation highlighting
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Add CSS for active nav link
const style = document.createElement("style");
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

