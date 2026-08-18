import "@/styles/footer-style.css";

export default function Footer() {
  return (
    <footer className="layout-footer">
      <div className="footer-top">
        <div className="footer-top-left">
          <div className="footer-logo">RADIAN</div>
          <p>
            DISCOVER INNOVATIVE ITEMS AND TOOLS DESIGNED TO SIMPLY YOUR DAILY
            ROUTINE.
          </p>
        </div>
        <div className="footer-top-right">
          <div className="footer-nav">
            <h3>SERVICE</h3>
            <a href="">EMAIL MARKETING</a>
            <a href="">CAMPAIGN</a>
            <a href="">BRANDING</a>
            <a href="">SOCIAL MEDIA</a>
          </div>
          <div className="footer-nav">
            <h3>ABOUT</h3>
            <a href="">OUR STORY</a>
            <a href="">BENEFITS</a>
            <a href="">TEAM</a>
            <a href="">CAREERS</a>
          </div>
          <div className="footer-nav">
            <h3>HELP</h3>
            <a href="">FAQS</a>
            <a href="">CONTACT US</a>
          </div>
        </div>
      </div>
      <div className="footer-center">
        <div className="footer-center-top">
          <h3>GET IN TOUCH</h3>
          <div className="footer-input">
            <input
              type="text"
              name="email"
              placeholder="ENTER YOUR EMAIL"
            ></input>
            <button type="submit" className="footer-button">
              SUBSCRIBE
            </button>
          </div>
        </div>
        <div className="footer-center-bottom">
          <div className="footer-policy">
            <a href="">PRIVACY POLICY</a>
            <a href="">TERM OF USE</a>
          </div>
          <p> &copy; 2026 COPYRIGHT BY RADIAN</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-brand">RADIAN</div>
        <div className="footer-gradient"></div>
      </div>
    </footer>
  );
}
