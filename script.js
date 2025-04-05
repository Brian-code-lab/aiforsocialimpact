document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animating sections when they come into view
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Start animations specific to each section
                const sectionId = entry.target.id;
                if (sectionId && animationFunctions[sectionId]) {
                    animationFunctions[sectionId]();
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Add enter animations
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add visible class to handle animations
    document.addEventListener('scroll', () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                card.classList.add('visible');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Specific animations for each section
    const animationFunctions = {
        climate: () => {
            // Additional climate section animations could be added here
            console.log('Climate section in view');
        },
        healthcare: () => {
            // Additional healthcare section animations could be added here
            console.log('Healthcare section in view');
        },
        education: () => {
            // Additional education section animations could be added here
            console.log('Education section in view');
        },
        accessibility: () => {
            // Additional accessibility section animations could be added here
            console.log('Accessibility section in view');
        },
        agriculture: () => {
            // Additional agriculture section animations could be added here
            console.log('Agriculture section in view');
        }
    };
    
    // Add interactive tooltips on hover for the demo elements
    const demoVisuals = document.querySelectorAll('.demo-visual');
    
    demoVisuals.forEach(visual => {
        visual.addEventListener('mouseenter', function() {
            // Add a subtle highlight effect
            this.style.boxShadow = '0 0 15px rgba(52, 152, 219, 0.5)';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            
            // Create tooltip with demo info
            const tooltip = document.createElement('div');
            tooltip.className = 'demo-tooltip';
            tooltip.innerHTML = getTooltipContent(this.parentElement.parentElement.id);
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '10px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.zIndex = '1000';
            tooltip.style.maxWidth = '250px';
            tooltip.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
            tooltip.style.top = '10px';
            tooltip.style.right = '10px';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s ease';
            
            this.appendChild(tooltip);
            
            // Fade in tooltip
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 100);
        });
        
        visual.addEventListener('mouseleave', function() {
            // Remove highlight effect
            this.style.boxShadow = '';
            this.style.transform = '';
            
            // Remove tooltip
            const tooltip = this.querySelector('.demo-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            }
        });
    });
    
    // Function to get specific tooltip content for each section
    function getTooltipContent(sectionId) {
        const tooltips = {
            climate: "This visualization shows how AI analyzes weather patterns and sensor data to predict natural disasters and monitor carbon emissions.",
            healthcare: "This demonstrates how AI scans medical images to detect potential health issues early, helping healthcare professionals make more accurate diagnoses.",
            education: "This shows an adaptive learning system that creates personalized educational paths based on each student's performance and learning style.",
            accessibility: "This demonstrates real-time speech-to-text conversion, one of many AI technologies making digital content more accessible to everyone.",
            agriculture: "This depicts how AI analyzes farm conditions through sensors to optimize irrigation, detect crop diseases, and reduce resource waste."
        };
        
        return tooltips[sectionId] || "Interactive AI demonstration";
    }
    
    // Progressive loading for content to improve perceived performance
    setTimeout(() => {
        document.querySelectorAll('.demo-container').forEach(container => {
            container.style.opacity = '0';
            container.style.display = 'flex';
            container.style.transition = 'opacity 0.6s ease';
            
            setTimeout(() => {
                container.style.opacity = '1';
            }, 300);
        });
    }, 500);
}); 