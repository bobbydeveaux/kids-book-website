/**
 * Table of Contents functionality for care guide pages
 * Handles active section highlighting, smooth scrolling, and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function() {
    const toc = document.querySelector('.table-of-contents');
    const tocLinks = document.querySelectorAll('.toc-link, .toc-sublink');
    const sections = document.querySelectorAll('.care-section, .care-subsection');
    const tocToggle = document.querySelector('.toc-toggle');
    const tocContent = document.querySelector('.toc-content');

    if (!toc || !sections.length) return;

    // Create mobile toggle if it doesn't exist
    if (window.innerWidth <= 480 && !tocToggle) {
        createMobileToggle();
    }

    // Handle mobile toggle
    if (tocToggle && tocContent) {
        tocToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            tocContent.classList.toggle('expanded');
        });
    }

    // Smooth scrolling for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculate offset for sticky header
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const offset = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });

                // Update URL
                history.pushState(null, null, `#${targetId}`);

                // Close mobile menu if open
                if (tocContent && tocToggle) {
                    tocToggle.setAttribute('aria-expanded', 'false');
                    tocContent.classList.remove('expanded');
                }
            }
        });
    });

    // Intersection Observer for active section highlighting
    const observerOptions = {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const id = entry.target.id;
            const tocLink = document.querySelector(`.toc-link[href="#${id}"], .toc-sublink[href="#${id}"]`);

            if (entry.isIntersecting) {
                // Remove active class from all links
                tocLinks.forEach(link => link.classList.remove('active'));

                // Add active class to current link
                if (tocLink) {
                    tocLink.classList.add('active');

                    // Also activate parent if this is a subsection
                    if (tocLink.classList.contains('toc-sublink')) {
                        const parentSection = tocLink.closest('.toc-list > li');
                        if (parentSection) {
                            const parentLink = parentSection.querySelector('.toc-link');
                            if (parentLink) parentLink.classList.add('active');
                        }
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });

    // Handle page load with hash
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const offset = target.offsetTop - headerHeight - 20;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }, 100);
    }

    // Create mobile toggle function
    function createMobileToggle() {
        const tocTitle = toc.querySelector('.toc-title');
        if (tocTitle) {
            const toggle = document.createElement('button');
            toggle.className = 'toc-toggle';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', 'toc-content');
            toggle.innerHTML = tocTitle.textContent;

            const content = document.createElement('div');
            content.id = 'toc-content';
            content.className = 'toc-content';

            // Move TOC list to content wrapper
            const tocList = toc.querySelector('.toc-list');
            if (tocList) {
                content.appendChild(tocList);
            }

            // Replace title with toggle and add content wrapper
            tocTitle.replaceWith(toggle);
            toc.appendChild(content);
        }
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 480) {
            // Desktop view - remove mobile classes
            if (tocToggle) {
                tocToggle.setAttribute('aria-expanded', 'false');
            }
            if (tocContent) {
                tocContent.classList.remove('expanded');
            }
        }
    });

    // Add reading progress indicator (optional enhancement)
    addReadingProgress();

    function addReadingProgress() {
        const article = document.querySelector('.care-guide-content');
        if (!article) return;

        const progressContainer = document.createElement('div');
        progressContainer.className = 'toc-progress';

        const progressBar = document.createElement('div');
        progressBar.className = 'toc-progress-bar';

        progressContainer.appendChild(progressBar);
        toc.appendChild(progressContainer);

        window.addEventListener('scroll', function() {
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;

            const progress = Math.max(0, Math.min(1,
                (scrollTop - articleTop + windowHeight * 0.8) / articleHeight
            ));

            progressBar.style.height = (progress * 100) + '%';
        });
    }
});

// Export for potential use by other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { /* TOC functionality */ };
}