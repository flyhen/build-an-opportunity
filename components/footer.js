class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer-minimal" id="footer">
            <div class="footer-content">
                <!-- Brand Column -->
                <div class="footer-col-brand">
                    <h3>Build An Opportunity</h3>
                    <p>Empowering Uganda's next generation through faith-driven development, education, and holistic
                        community support.</p>
                    <div class="social-icons-minimal">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>

                <!-- Links Column 1 -->
                <div class="footer-col">
                    <h4>Programs</h4>
                    <ul class="footer-links-list">
                        <li><a href="sponsorship.html">Sponsorship</a></li>
                        <li><a href="model.html">Education & Skills</a></li>
                        <li><a href="model.html">Mentorship</a></li>
                        <li><a href="impact.html">From the Field</a></li>
                    </ul>
                </div>
 
                <!-- Links Column 2 -->
                <div class="footer-col">
                    <h4>Get Involved</h4>
                    <ul class="footer-links-list">
                        <li><a href="give.html">Build With Us</a></li>
                        <li><a href="give.html">Partner With Us</a></li>
                        <li><a href="impact.html">Annual Report</a></li>
                        <li><a href="give.html">Volunteer Center</a></li>
                    </ul>
                </div>

                <!-- Newsletter Column -->
                <div class="footer-col footer-col-newsletter">
                    <h4>Stay Updated</h4>
                    <p>Stories of hope delivered to your inbox.</p>
                    <form id="minimalNewsletter" class="minimal-form">
                        <input type="email" placeholder="Email address" required>
                        <button type="submit">Join</button>
                    </form>
                    <p class="form-note"><i class="fas fa-envelope"></i> info@buildanopportunity.org</p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; <span id="year">2026</span> Build An Opportunity. A 501(c)(3) Organization.</p>
                <div class="footer-legal-links">
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                    <a href="/contact">Contact</a>
                </div>
            </div>
        </footer>
        `;
    }
}
customElements.define('my-footer', MyFooter);
