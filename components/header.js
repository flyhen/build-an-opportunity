class MyHeader extends HTMLElement {
    connectedCallback() {
        const activePage = this.getAttribute('active') || '';

        this.innerHTML = `
        <div class="top-bar">
            <div class="top-bar-content">
                <div class="top-bar-left">
                    <span class="announcement"><i class="fas fa-hammer"></i> Campaign: Support our Land Campaign
                        today!</span>
                </div>
                <div class="top-bar-right">
                    <div class="top-bar-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Search...">
                    </div>
                    <a href="https://buildanopportunity.org/sponsor-login" class="top-bar-login">
                        <i class="far fa-user"></i> Sponsor Login
                    </a>
                </div>
            </div>
        </div>
        <nav class="main-nav">
            <div class="nav-content">
                <a href="index.html" class="logo">
                    <img src="logo.png" alt="Build An Opportunity" class="logo-img">
                </a>
                <ul class="nav-links">
                    <li class="nav-item">
                        <a href="our-story.html" class="nav-link ${activePage === 'about' ? 'active' : ''}" data-dropdown="about">
                            About Us
                            <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </a>
                        ${this.getAboutDropdown()}
                    </li>
                    <li class="nav-item">
                        <a href="sponsorship.html" class="nav-link ${activePage === 'sponsor' ? 'active' : ''}" data-dropdown="sponsor">
                            Sponsorship
                            <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </a>
                        ${this.getSponsorDropdown()}
                    </li>
                    <li class="nav-item">
                        <a href="programs.html" class="nav-link ${activePage === 'programs' ? 'active' : ''}" data-dropdown="programs">
                            Programs
                            <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </a>
                        ${this.getProgramsDropdown()}
                    </li>
                    <li class="nav-item">
                        <a href="impact.html" class="nav-link ${activePage === 'stories' ? 'active' : ''}" data-dropdown="stories">
                            Stories & News
                            <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </a>
                        ${this.getStoriesDropdown()}
                    </li>
                    <li class="nav-item">
                        <a href="give.html" class="nav-link ${activePage === 'give' ? 'active' : ''}" data-dropdown="give">
                            Build With Us
                            <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </a>
                        ${this.getGiveDropdown()}
                    </li>
                </ul>
                <div class="nav-actions">
                    <a href="give.html" class="give-now-btn-refined">Give Now</a>
                </div>
                <button class="mobile-toggle"><i class="fas fa-bars"></i></button>
            </div>
        </nav>
        <div id="mobile-menu-container"></div>
        `;
    }

    getAboutDropdown() {
        return `
        <div class="fullwidth-dropdown">
            <div class="dropdown-container">
                <button class="dropdown-close-desktop" aria-label="Close menu">&times;</button>
                <div class="dropdown-split">
                    <a href="model.html" class="split-image-container">
                        <img src="https://picsum.photos/1200/420?random=31" alt="About Us" class="split-image">
                        <div class="image-overlay">
                            <span>Learn More <i class="fas fa-arrow-right"></i></span>
                        </div>
                    </a>
                    <div class="dropdown-grid">
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Our Purpose</h3>
                            <div class="dropdown-item">
                                <h4>Dignity, Not Handouts</h4>
                                <p>Moving beyond charity toward lasting opportunity by tackling poverty at its roots.</p>
                                <a href="index.html#sponsor" class="arrow-link">Our Philosophy <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Our Model</h3>
                            <div class="dropdown-item">
                                <h4>Listen. Co-create. Empower.</h4>
                                <p>We start by hearing the community, building pathways together using technology and faith.</p>
                                <a href="model.html" class="arrow-link">See Our Model <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Team</h3>
                            <div class="dropdown-item">
                                <h4>Meet Our Team</h4>
                                <p>Dedicated leaders in Uganda and abroad working together for lasting change.</p>
                                <a href="model.html#team" class="arrow-link">View Team <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    getSponsorDropdown() {
        return `
        <div class="fullwidth-dropdown">
            <div class="dropdown-container">
                <div class="dropdown-split">
                    <a href="sponsorship.html" class="split-image-container">
                        <img src="https://picsum.photos/1200/420?random=32" alt="Sponsor a Child" class="split-image">
                        <div class="image-overlay">
                            <span>Learn More <i class="fas fa-arrow-right"></i></span>
                        </div>
                    </a>
                    <div class="dropdown-grid">
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Child Sponsorship</h3>
                            <a href="sponsorship.html" class="dropdown-item">
                                <h4>Transform a Life - $39/month</h4>
                                <p>Provide a child with education, healthcare, nutrition, and spiritual support.</p>
                            </a>
                            <a href="sponsorship.html" class="dropdown-item">
                                <h4>Personal Connection</h4>
                                <p>Exchange letters and build a meaningful relationship with your sponsored child.</p>
                            </a>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">How It Works</h3>
                            <a href="sponsorship.html" class="dropdown-item">
                                <h4>Choose a Child</h4>
                                <p>Browse profiles of children waiting for sponsors, filtered by age or special needs.</p>
                            </a>
                            <a href="sponsorship.html" class="dropdown-item">
                                <h4>Start Sponsorship</h4>
                                <p>Complete a simple online form with flexible payment options.</p>
                            </a>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Impact</h3>
                            <a href="sponsorship.html" class="dropdown-item">
                                <h4>Community Focus</h4>
                                <p>Your sponsorship also helps the child's family and community through holistic programs.</p>
                            </a>
                            <a href="sponsorship.html" class="dropdown-item">
                                <h4>Child Protection</h4>
                                <p>We prioritize safety with strict protection policies and background checks.</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    getProgramsDropdown() {
        return `
        <div class="fullwidth-dropdown">
            <div class="dropdown-container">
                <div class="dropdown-split">
                    <a href="model.html" class="split-image-container">
                        <img src="https://picsum.photos/1200/420?random=33" alt="Programs" class="split-image">
                        <div class="image-overlay">
                            <span>Learn More <i class="fas fa-arrow-right"></i></span>
                        </div>
                    </a>
                    <div class="dropdown-grid">
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Essential Care</h3>
                            <div class="dropdown-item">
                                <h4>Education & Well-being</h4>
                                <p>Holistic learning while supporting basic needs. Listening first, not imposing.</p>
                                <a href="model.html" class="arrow-link">Learn More <i class="fas fa-arrow-right"></i></a>
                            </div>
                            <div class="dropdown-item">
                                <h4>Feeding & Orphan Care</h4>
                                <p>Fortified meals and holistic support for vulnerable children and families.</p>
                                <a href="model.html" class="arrow-link">Be the Hope <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Digital & Creativity</h3>
                            <div class="dropdown-item">
                                <h4>Youth Digital Skills</h4>
                                <p>JavaScript, programming, and software foundations for real-world employment.</p>
                                <a href="model.html" class="arrow-link">Learn More <i class="fas fa-arrow-right"></i></a>
                            </div>
                            <div class="dropdown-item">
                                <h4>Visual Storytelling</h4>
                                <p>Illustration → Moho → Premiere Pro. Animation as a tool for income and learning.</p>
                                <a href="model.html" class="arrow-link">Learn More <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Identity</h3>
                            <div class="dropdown-item">
                                <h4>Faith-Centered Development</h4>
                                <p>Values-driven growth where faith motivates service, integrity, and impact.</p>
                                <a href="model.html" class="arrow-link">Our Approach <i class="fas fa-arrow-right"></i></a>
                            </div>
                            <div class="dropdown-item">
                                <h4>Lasting Opportunity</h4>
                                <p>Community growth rooted in meaning, moving beyond dependency.</p>
                                <a href="model.html" class="arrow-link">See Impact <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    getStoriesDropdown() {
        return `
        <div class="fullwidth-dropdown">
            <div class="dropdown-container">
                <div class="dropdown-split">
                    <a href="impact.html" class="split-image-container">
                        <img src="https://picsum.photos/1200/420?random=34" alt="Stories & News" class="split-image">
                        <div class="image-overlay">
                            <span>Read Stories <i class="fas fa-arrow-right"></i></span>
                        </div>
                    </a>
                    <div class="dropdown-grid">
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">From the Field</h3>
                            <a href="impact.html" class="dropdown-item">
                                <h4>Latest Updates</h4>
                                <p>Real-time reports on community transformation and project milestones.</p>
                            </a>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Community Voices</h3>
                            <a href="impact.html#voices" class="dropdown-item">
                                <h4>Hear Their Stories</h4>
                                <p>Direct interviews with the families and students we serve.</p>
                            </a>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Social Hub</h3>
                            <a href="vibe.html" class="dropdown-item">
                                <h4>Join the Conversation</h4>
                                <p>Follow our journey on social media.</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    getGiveDropdown() {
        return `
        <div class="fullwidth-dropdown">
            <div class="dropdown-container">
                <div class="dropdown-split">
                    <a href="give.html" class="split-image-container">
                        <img src="https://picsum.photos/1200/420?random=36" alt="Build With Us" class="split-image">
                        <div class="image-overlay">
                            <span>Start Building <i class="fas fa-arrow-right"></i></span>
                        </div>
                    </a>
                    <div class="dropdown-grid">
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Land Campaign</h3>
                            <a href="give.html" class="dropdown-item">
                                <h4>Secure Our Future</h4>
                                <p>Help us purchase the land to build a permanent high school for the community.</p>
                            </a>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Volunteer</h3>
                            <a href="give.html#volunteer" class="dropdown-item">
                                <h4>Share Your Skills</h4>
                                <p>Join us in teaching, farming, or technology mentorship.</p>
                            </a>
                        </div>
                        <div class="dropdown-section">
                            <h3 class="dropdown-title">Pray With Us</h3>
                            <a href="pray.html" class="dropdown-item">
                                <h4>Prayer Network</h4>
                                <p>Join our global community in spiritual support and intercession.</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
}
customElements.define('my-header', MyHeader);
