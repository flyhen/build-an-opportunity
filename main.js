document.addEventListener('DOMContentLoaded', () => {
    // === PROFESSIONAL MOBILE DRAWER LOGIC ===
    function setupMobileDrawer() {
        const header = document.querySelector('my-header');
        if (!header) return;

        // Check if drawer already exists to avoid duplicates
        let drawer = document.getElementById('mobileDraw');
        if (drawer) return;

        // Create Drawer Container
        drawer = document.createElement('div');
        drawer.className = 'mobile-drawer';
        drawer.id = 'mobileDraw';
        drawer.innerHTML = `
            <div class="mobile-drawer-header">
                <div class="logo-mobile">
                    <img src="logo.png" style="height: 38px; width: auto;">
                </div>
                <button class="mobile-drawer-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="mobile-drawer-content">
                <div class="mobile-drawer-search">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search our programs...">
                </div>
                <nav class="mobile-nav-list"></nav>
            </div>
        `;
        document.body.appendChild(drawer);

        const navList = drawer.querySelector('.mobile-nav-list');
        const closeBtn = drawer.querySelector('.mobile-drawer-close');
        const mobileToggle = document.querySelector('.mobile-toggle');

        // Close Drawer
        closeBtn.addEventListener('click', () => drawer.classList.remove('active'));

        // Toggle Drawer
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                drawer.classList.add('active');
                renderAccordion();
            });
        }

        function renderAccordion() {
            navList.innerHTML = '';

            // Extract items from desktop nav
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                const mainLink = item.querySelector('.nav-link');
                const dropdown = item.querySelector('.fullwidth-dropdown');
                if (!mainLink) return;

                const name = mainLink.textContent.trim();
                const navItemWrapper = document.createElement('div');
                navItemWrapper.className = 'mobile-nav-item';

                // Check if it has a dropdown
                if (dropdown) {
                    const subItems = dropdown.querySelectorAll('.dropdown-item');

                    navItemWrapper.innerHTML = `
                        <div class="mobile-nav-label">
                            <span>${name}</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="mobile-accordion-panel"></div>
                    `;

                    const panel = navItemWrapper.querySelector('.mobile-accordion-panel');
                    subItems.forEach(si => {
                        const siTitle = si.querySelector('h4') ? si.querySelector('h4').textContent : '';
                        const siDesc = si.querySelector('p') ? si.querySelector('p').textContent : '';
                        const siLink = si.querySelector('a');

                        // Use sub-item link if exists, otherwise fallback to main category link
                        const targetHref = siLink ? siLink.href : mainLink.href;

                        const a = document.createElement('a');
                        a.className = 'mobile-accordion-link';
                        a.href = targetHref;
                        a.innerHTML = `
                            <div class="link-title">${siTitle}</div>
                            ${siDesc ? `<p class="link-desc">${siDesc}</p>` : ''}
                        `;
                        panel.appendChild(a);
                    });

                    // Toggle functionality
                    navItemWrapper.querySelector('.mobile-nav-label').addEventListener('click', (e) => {
                        const isActive = navItemWrapper.classList.contains('item-active');
                        // Close others
                        document.querySelectorAll('.mobile-nav-item').forEach(other => other.classList.remove('item-active'));
                        if (!isActive) {
                            navItemWrapper.classList.add('item-active');
                        }
                    });
                } else {
                    // Regular link
                    navItemWrapper.innerHTML = `
                        <a href="${mainLink.href}" class="mobile-nav-label single-link">
                            <span>${name}</span>
                        </a>
                    `;
                }

                navList.appendChild(navItemWrapper);
            });
        }
    }
    setupMobileDrawer();

    // Sticky Navbar Effect on Scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        if (nav && window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else if (nav) {
            nav.classList.remove('scrolled');
        }
    });

    // === NAVIGATION LOGIC ===
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('.search-box');

    // Old mobile logic (dropdown panels) removed as it's replaced by setupMobileDrawer()
    document.body.addEventListener('click', (e) => {
        // Handle Back Buttons of old panels if any still exist in DOM
        const btn = e.target.closest('.back-button');
        if (btn && window.innerWidth <= 768) {
            const id = btn.getAttribute('data-back') + '-dropdown';
            const panel = document.getElementById(id);
            if (panel) panel.classList.remove('active');
        }
    });

    // Resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            document.querySelectorAll('.mobile-dropdown-panel').forEach(p => p.classList.remove('active'));
            searchBox.classList.remove('active');
        }
    });

    /* --- Desktop dropdown accessibility + lazy reveal animation control --- */
    (function setupDesktopDropdowns() {
        const DESKTOP_BREAK = 769;
        const openDelay = 120;
        const closeDelay = 120;

        // set initial aria attributes for triggers
        document.querySelectorAll('.nav-link[data-dropdown]').forEach(link => {
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
        });

        function closeAllDropdowns() {
            document.querySelectorAll('.fullwidth-dropdown.show-dropdown').forEach(dd => dd.classList.remove('show-dropdown'));
            document.querySelectorAll('.nav-link[data-dropdown]').forEach(l => l.setAttribute('aria-expanded', 'false'));
        }

        // close on outside click (desktop only)
        document.addEventListener('click', (e) => {
            if (window.innerWidth < DESKTOP_BREAK) return;
            if (e.target.closest('.dropdown-close-desktop')) {
                closeAllDropdowns();
                return;
            }
            if (!e.target.closest('.main-nav')) {
                closeAllDropdowns();
            }
        });

        // close on Esc key (desktop only)
        document.addEventListener('keydown', (e) => {
            if (window.innerWidth < DESKTOP_BREAK) return;
            if (e.key === 'Escape' || e.key === 'Esc') {
                closeAllDropdowns();
            }
        });

        // Attach pointer / focus handlers to nav-items for desktop behaviors
        document.querySelectorAll('.nav-item').forEach(item => {
            const link = item.querySelector('.nav-link[data-dropdown]');
            const dd = item.querySelector('.fullwidth-dropdown');
            if (!link || !dd) return;

            let openTimer = null;
            let closeTimer = null;

            function openDropdown() {
                if (window.innerWidth < DESKTOP_BREAK) return;
                clearTimeout(closeTimer);
                openTimer = setTimeout(() => {
                    dd.classList.add('show-dropdown');
                    link.setAttribute('aria-expanded', 'true');
                    if (!dd.dataset.revealed) dd.dataset.revealed = 'true';
                }, openDelay);
            }

            function closeDropdown() {
                if (window.innerWidth < DESKTOP_BREAK) return;
                clearTimeout(openTimer);
                closeTimer = setTimeout(() => {
                    dd.classList.remove('show-dropdown');
                    link.setAttribute('aria-expanded', 'false');
                }, closeDelay);
            }

            item.addEventListener('pointerenter', openDropdown);
            item.addEventListener('pointerleave', closeDropdown);
            item.addEventListener('focusin', openDropdown);
            item.addEventListener('focusout', closeDropdown);

            // Toggle on click for keyboard/mouse users on desktop
            link.addEventListener('click', (ev) => {
                if (window.innerWidth >= DESKTOP_BREAK) {
                    ev.preventDefault();
                    if (dd.classList.contains('show-dropdown')) {
                        dd.classList.remove('show-dropdown');
                        link.setAttribute('aria-expanded', 'false');
                    } else {
                        closeAllDropdowns();
                        dd.classList.add('show-dropdown');
                        link.setAttribute('aria-expanded', 'true');
                        if (!dd.dataset.revealed) dd.dataset.revealed = 'true';
                    }
                }
            });
        });

        // When resizing from mobile -> desktop, close mobile panels to avoid overlapping states
        window.addEventListener('resize', () => {
            if (window.innerWidth < DESKTOP_BREAK) {
                closeAllDropdowns();
            }
        });
    })();

    // HERO SLIDER LOGIC
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const track = document.getElementById('sliderTrack');
        const textPanel = document.querySelector('.slider-text-container');
        const slides = document.querySelectorAll('.slide');
        const titleEl = document.getElementById('slider-title');
        const captionEl = document.getElementById('slider-caption');
        const ctaEl = document.getElementById('slider-cta');
        const indicatorsContainer = document.querySelector('.slider-indicators');
        const prevBtn = document.querySelector('.slider-nav .prev');
        const nextBtn = document.querySelector('.slider-nav .next');

        let currentIndex = 0;
        const totalSlides = slides.length;
        const slideInterval = 6000;
        let autoSlideInterval;
        let isAnimating = false;

        function createIndicators() {
            indicatorsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = `slider-indicator ${index === 0 ? 'active' : ''}`;
                indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
                indicator.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(indicator);
            });
        }

        function updateText(index) {
            const currentSlide = slides[index];
            textPanel.classList.remove('active');
            setTimeout(() => {
                titleEl.textContent = currentSlide.getAttribute('data-title');
                captionEl.textContent = currentSlide.getAttribute('data-caption');
                ctaEl.textContent = currentSlide.getAttribute('data-cta-text');
                ctaEl.href = currentSlide.getAttribute('data-cta-link');
                setTimeout(() => {
                    textPanel.classList.add('active');
                }, 50);
            }, 300);
        }

        function updateIndicators(index) {
            const indicators = document.querySelectorAll('.slider-indicator');
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
        }

        function goToSlide(index, instant = false) {
            if (isAnimating && !instant) return;
            isAnimating = true;
            currentIndex = index;

            if (!instant) {
                track.classList.add('animating');
                setTimeout(() => {
                    track.classList.remove('animating');
                }, 1200);
            }

            const translateX = -(currentIndex * (100 / totalSlides));
            track.style.transition = instant ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            track.style.transform = `translateX(${translateX}%)`;

            updateText(currentIndex);
            updateIndicators(currentIndex);
            resetAutoSlide();

            if (!instant) {
                setTimeout(() => {
                    isAnimating = false;
                }, 800);
            } else {
                isAnimating = false;
            }
        }

        function nextSlide() {
            goToSlide((currentIndex + 1) % totalSlides);
        }

        function prevSlide() {
            goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
        }

        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, slideInterval);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        function initSlider() {
            heroSlider.classList.remove('loading');
            createIndicators();

            const firstSlide = slides[0];
            titleEl.textContent = firstSlide.getAttribute('data-title');
            captionEl.textContent = firstSlide.getAttribute('data-caption');
            ctaEl.textContent = firstSlide.getAttribute('data-cta-text');
            ctaEl.href = firstSlide.getAttribute('data-cta-link');

            startAutoSlide();

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    prevSlide();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    nextSlide();
                });
            }

            if (prevBtn && nextBtn) {
                [prevBtn, nextBtn].forEach(btn => {
                    btn.addEventListener('mouseenter', () => {
                        btn.style.transform = 'scale(1.1)';
                    });
                    btn.addEventListener('mouseleave', () => {
                        btn.style.transform = 'scale(1)';
                    });
                });
            }

            let touchStartX = 0;
            let touchEndX = 0;

            heroSlider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            });

            heroSlider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                const swipeThreshold = 50;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }

                setTimeout(() => {
                    startAutoSlide();
                }, 1000);
            });
        }

        initSlider();
    }

    const sponsorLoginBtn = document.getElementById('sponsorLoginBtn');
    const giveNowBtn = document.getElementById('GiveNowBtn');

    if (sponsorLoginBtn) {
        sponsorLoginBtn.addEventListener('click', () => {
            window.location.href = 'https://buildanopportunity.org/sponsor-login';
        });
    }

    if (giveNowBtn) {
        giveNowBtn.addEventListener('click', () => {
            window.location.href = '/give';
        });
    }

    // === MINIMALIST BENTO FOOTER LOGIC ===
    // === MINIMALIST BENTO FOOTER LOGIC ===
    // Renamed to auto-run logic for invalidation
    function initBentoFooter() {
        // 1. Revolving Community Fact (retain)
        const facts = [
            "95% of our sponsored children complete their secondary education.",
            "Since 2010, we've served over 1.2 million nutritious meals.",
            "Our mentorship circles have reached 50+ villages across Uganda.",
            "80% of our alumni are currently employed or in higher education.",
            "We maintain a 4-star excellence rating from Charity Navigator."
        ];
        const factEl = document.getElementById('revolvingFact');
        if (factEl) {
            let factIndex = 0;
            // Clear existing interval if any (though in this context multiple calls shouldn't happen)
            if (window.factInterval) clearInterval(window.factInterval);

            window.factInterval = setInterval(() => {
                factEl.style.opacity = 0;
                setTimeout(() => {
                    factIndex = (factIndex + 1) % facts.length;
                    factEl.textContent = facts[factIndex];
                    factEl.style.opacity = 1;
                }, 500);
            }, 6000);
            factEl.style.transition = 'opacity 0.5s ease';
        }

        // 2. Newsletter Form handling (retain)
        const modernForm = document.getElementById('footerNewsletter');
        if (modernForm) {
            modernForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = modernForm.querySelector('button');
                const input = modernForm.querySelector('input');
                btn.innerHTML = 'Sending...';
                setTimeout(() => {
                    btn.innerHTML = 'Sent! <i class="fas fa-check"></i>';
                    btn.style.background = '#22c55e';
                    input.value = '';
                    setTimeout(() => {
                        btn.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
                        btn.style.background = '';
                    }, 3000);
                }, 1500);
            });
        }
    }

    // Initialize footer logic when DOM content is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBentoFooter);
    } else {
        initBentoFooter();
    }

    function initBentoFooter() {
        // 1. Revolving Community Fact (retain)
        const facts = [
            "95% of our sponsored children complete their secondary education.",
            "Since 2010, we've served over 1.2 million nutritious meals.",
            "Our mentorship circles have reached 50+ villages across Uganda.",
            "80% of our alumni are currently employed or in higher education.",
            "We maintain a 4-star excellence rating from Charity Navigator."
        ];
        const factEl = document.getElementById('revolvingFact');
        if (factEl) {
            let factIndex = 0;
            // Clear existing interval if any (though in this context multiple calls shouldn't happen)
            if (window.factInterval) clearInterval(window.factInterval);

            window.factInterval = setInterval(() => {
                factEl.style.opacity = 0;
                setTimeout(() => {
                    factIndex = (factIndex + 1) % facts.length;
                    factEl.textContent = facts[factIndex];
                    factEl.style.opacity = 1;
                }, 500);
            }, 6000);
            factEl.style.transition = 'opacity 0.5s ease';
        }

        // 2. Newsletter Form handling (retain)
        const modernForm = document.getElementById('footerNewsletter');
        if (modernForm) {
            modernForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = modernForm.querySelector('button');
                const input = modernForm.querySelector('input');
                btn.innerHTML = 'Sending...';
                setTimeout(() => {
                    btn.innerHTML = 'Sent! <i class="fas fa-check"></i>';
                    btn.style.background = '#22c55e';
                    input.value = '';
                    setTimeout(() => {
                        btn.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
                        btn.style.background = '';
                    }, 3000);
                }, 1500);
            });
        }
    }



});


// === MINIMALIST FOOTER LOGIC ===
function initFooter() {
    const minimalForm = document.getElementById('minimalNewsletter');
    if (minimalForm) {
        minimalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = minimalForm.querySelector('button');
            const input = minimalForm.querySelector('input');
            const originalText = btn.textContent;

            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.innerHTML = 'Joined!';
                btn.style.background = '#22c55e';
                btn.style.opacity = '1';
                input.value = '';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }
}

// Init new footer
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
} else {
    initFooter();
}

// === SPONSORSHIP SECTION LOGIC ===
const children = [
    {
        id: 1, name: "Amina", age: 9, gender: "girl", location: "luwero",
        story: "I walk 3km to school every morning through red dirt paths. My dream is to become a teacher so I can help other children in my village learn to read and write. Some days I go hungry, but at school I get a warm meal from the BAO kitchen.",
        photo: "https://picsum.photos/600/800?random=11"
    },
    {
        id: 2, name: "Joseph", age: 11, gender: "boy", location: "mitiyana",
        story: "I love reading, but books are rare in my home. At the BAO mentorship circle, I practice reading aloud and help younger children. My father grows avocados, and I help after school. I want to be a leader who brings technology and farming together.",
        photo: "https://picsum.photos/600/800?random=12"
    },
    {
        id: 3, name: "Grace", age: 8, gender: "girl", location: "luwero",
        story: "In our digital club, I learned to make my first animation last month! It was a dancing chicken. My teacher said I have talent. When I grow up, I want to tell Ugandan stories through cartoons so the whole world can see our culture.",
        photo: "https://picsum.photos/600/800?random=13"
    },
    {
        id: 4, name: "Samuel", age: 10, gender: "boy", location: "mitiyana",
        story: "Our family farm grows Hass avocados, but we struggle with pests and drought. At BAO, I’m learning about organic farming and how to use apps to check weather and prices. I want to become an agronomist and teach other farmers how to grow more food.",
        photo: "https://picsum.photos/600/800?random=14"
    }
];

let filtered = [...children];
let currentIndex = 0;

function renderChild() {
    const photoEl = document.getElementById('childPhoto');
    const skeletonEl = document.getElementById('photoSkeleton');

    if (filtered.length === 0) {
        document.getElementById('childName').textContent = "No Matches";
        document.getElementById('childLocation').textContent = "Try adjusting your search.";
        document.getElementById('childStory').textContent = "";
        if (photoEl) {
            photoEl.src = "https://placehold.co/600x400?text=No+Match";
            photoEl.classList.remove('loading');
            photoEl.classList.add('loaded');
        }
        if (skeletonEl) skeletonEl.style.display = 'none';
        return;
    }

    const child = filtered[currentIndex];
    // Simple check to ensure location exists
    const loc = child.location ? child.location : "Unknown";
    const displayLocation = loc.charAt(0).toUpperCase() + loc.slice(1);

    document.getElementById('childName').textContent = `${child.name}, ${child.age}`;
    document.getElementById('childLocation').textContent = `${displayLocation}, Uganda`;
    document.getElementById('childStory').textContent = child.story;
    document.getElementById('childMeta').textContent = `ID: #${1000 + child.id} • WAITING FOR SPONSOR`;
    document.getElementById('matchCount').textContent = `${filtered.length} children found`;

    // Skeleton loading for photo
    if (photoEl && skeletonEl) {
        // Show skeleton, hide image
        skeletonEl.style.display = 'block';
        photoEl.classList.add('loading');
        photoEl.classList.remove('loaded');

        // Create new image to preload
        const img = new Image();
        img.onload = function () {
            photoEl.src = child.photo;
            // Small delay for smooth transition
            setTimeout(() => {
                skeletonEl.style.display = 'none';
                photoEl.classList.remove('loading');
                photoEl.classList.add('loaded');
            }, 150);
        };
        img.onerror = function () {
            // Fallback on error
            photoEl.src = "https://placehold.co/600x800?text=Photo+Unavailable";
            skeletonEl.style.display = 'none';
            photoEl.classList.remove('loading');
            photoEl.classList.add('loaded');
        };
        img.src = child.photo;
    } else if (photoEl) {
        // Fallback if skeleton element not found
        photoEl.src = child.photo;
    }
}

function filterChildren() {
    const nameQuery = document.getElementById('searchName').value.toLowerCase();
    const gender = document.getElementById('gender').value;
    const minAge = parseInt(document.getElementById('age').value);
    const location = document.getElementById('location').value;

    filtered = children.filter(c => {
        const matchesName = c.name.toLowerCase().includes(nameQuery);
        const matchesGender = gender === '' || c.gender === gender;
        const matchesLocation = location === '' || c.location === location;
        const matchesAge = c.age >= minAge;
        return matchesName && matchesGender && matchesLocation && matchesAge;
    });

    currentIndex = 0;
    renderChild();
}

// Expose functions to global scope for onclick attributes
window.nextChild = function () {
    if (filtered.length > 0) {
        currentIndex = (currentIndex + 1) % filtered.length;
        renderChild();
    }
};

window.prevChild = function () {
    if (filtered.length > 0) {
        currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
        renderChild();
    }
};

window.sponsorCurrent = function () {
    if (filtered.length > 0) {
        const child = filtered[currentIndex];
        alert(`Drafting sponsorship for ${child.name} (ID: ${child.id})!`);
    }
};

// Listeners and Init
if (document.getElementById('searchName')) {
    document.getElementById('searchName').addEventListener('input', filterChildren);
    document.getElementById('gender').addEventListener('change', filterChildren);
    document.getElementById('location').addEventListener('change', filterChildren);
    document.getElementById('age').addEventListener('input', (e) => {
        document.getElementById('age-display').textContent = e.target.value;
        filterChildren();
    });

    // Initial Render
    renderChild();

    // === AUTO-ROTATION LOGIC ===
    let autoRotator;
    const rotationInterval = 5000; // 5 seconds

    function startChildRotator() {
        if (autoRotator) clearInterval(autoRotator);
        autoRotator = setInterval(() => {
            // Only rotate if filtered list has items
            if (filtered.length > 1) {
                window.nextChild();
            }
        }, rotationInterval);
    }

    function stopChildRotator() {
        if (autoRotator) clearInterval(autoRotator);
    }

    // Pause on Hover
    const displayArea = document.querySelector('.child-display-area');
    if (displayArea) {
        displayArea.addEventListener('mouseenter', stopChildRotator);
        displayArea.addEventListener('mouseleave', startChildRotator);
    }

    // Start on Load
    startChildRotator();
}

// === IMPACT HUB LOGIC (Merged) ===

function openTab(evt, tabName) {
    var i, tabContent, tabBtns;

    // Hide all tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("active");
    }

    // Remove active class from buttons
    tabBtns = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtns.length; i++) {
        tabBtns[i].className = tabBtns[i].className.replace(" active", "");
    }

    // Show current tab and add active class to button
    document.getElementById(tabName).style.display = "block";
    // Short timeout to allow display:block to apply before adding active class for animation
    setTimeout(() => {
        document.getElementById(tabName).classList.add("active");
    }, 10);
    evt.currentTarget.className += " active";
}

function openModal(title, content) {
    const modal = document.getElementById('newsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = title;
    // For demo purposes, we are just filling with placeholder text if no content provided
    modalBody.innerHTML = content || `<p>Full article content would be fetched from a CMS here...</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('newsModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal if clicking outside content
window.onclick = function (event) {
    const modal = document.getElementById('newsModal');
    if (event.target == modal) {
        closeModal();
    }
}
    // === SIMPLE NEWSLETTER FORM ===
    (function initNewsletter() {
        const form = document.getElementById('newsletterForm');
        const emailInput = document.getElementById('newsletterEmail');
        const formNote = document.getElementById('formNote');

        if (!form || !emailInput) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = emailInput.value.trim();

            // Validate
            if (!email || !emailRegex.test(email)) {
                formNote.textContent = 'Please enter a valid email';
                formNote.className = 'form-note error';
                return;
            }

            // Show loading
            const btn = form.querySelector('button');
            btn.innerHTML = 'Subscribing... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            // Simulate API (replace with actual endpoint)
            setTimeout(() => {
                formNote.textContent = '✓ Subscribed! Thank you.';
                formNote.className = 'form-note success';
                emailInput.value = '';
                btn.innerHTML = 'Subscribe <i class="fas fa-arrow-right"></i>';
                btn.disabled = false;
            }, 1200);
        });
    })();

// === INTERACTIVE UGANDA MAP (Leaflet) ===
// Use setTimeout to ensure container is sized before Leaflet init
setTimeout(function initUgandaMap() {
    const mapContainer = document.getElementById('ugandaMap');
    if (!mapContainer || typeof L === 'undefined') {
        console.log('Map container or Leaflet not found');
        return;
    }

    // Initialize map centered on Uganda
    const map = L.map('ugandaMap', {
        scrollWheelZoom: false
    }).setView([0.6, 32.2], 7);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // GeoJSON for Ugandan districts (Mityana, Luwero, Kampala)
    const ugandaDistricts = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": { "name": "Mityana", "type": "operations" },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [31.5, 0.3], [31.5, 0.8], [32.0, 0.8], [32.0, 0.3], [31.5, 0.3]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": { "name": "Luwero", "type": "operations" },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [32.2, 0.5], [32.2, 1.1], [32.8, 1.1], [32.8, 0.5], [32.2, 0.5]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": { "name": "Kampala", "type": "admin" },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [32.45, 0.25], [32.45, 0.4], [32.65, 0.4], [32.65, 0.25], [32.45, 0.25]
                    ]]
                }
            }
        ]
    };

    // Style function for districts
    function styleDistrict(feature) {
        if (feature.properties.type === "operations") {
            return {
                fillColor: "#dbeafe",
                weight: 2,
                opacity: 1,
                color: "#1e3a8a",
                dashArray: "3",
                fillOpacity: 0.5
            };
        } else if (feature.properties.type === "admin") {
            return {
                fillColor: "#fef3c7",
                weight: 2,
                opacity: 1,
                color: "#92400e",
                dashArray: "2,4",
                fillOpacity: 0.4
            };
        }
        return {};
    }

    // Highlight on hover
    function highlightFeature(e) {
        const layer = e.target;
        layer.setStyle({
            weight: 3,
            dashArray: '',
            fillOpacity: 0.7
        });
        layer.bringToFront();
    }

    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
    }

    // Add GeoJSON layer
    const geojsonLayer = L.geoJSON(ugandaDistricts, {
        style: styleDistrict,
        onEachFeature: function (feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });

            const popupContent = feature.properties.type === "operations"
                ? `<strong>${feature.properties.name}</strong><br>✅ Active BAO Impact Zone<br><small>Education, Farming & Mentorship</small>`
                : `<strong>${feature.properties.name}</strong><br>📍 Administrative Hub`;

            layer.bindPopup(popupContent);
        }
    }).addTo(map);

    // Force map to recalculate size after container is rendered
    setTimeout(() => {
        map.invalidateSize();
    }, 100);

    // Enable scroll zoom on click
    map.on('click', function () {
        map.scrollWheelZoom.enable();
    });

    mapContainer.addEventListener('mouseleave', function () {
        map.scrollWheelZoom.disable();
    });
}, 500);

// === GLOBAL MODAL LOGIC ===
function openModal(title, content) {
    const modal = document.getElementById('newsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content; // Allows HTML content
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    const modal = document.getElementById('newsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside content
window.addEventListener('click', function (event) {
    const modal = document.getElementById('newsModal');
    if (event.target === modal) {
        closeModal();
    }
});
