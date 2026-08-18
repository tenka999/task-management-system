import "@/styles/navbar-style.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-menu">
          <a href="#">Home</a>
          <a href="#">Product</a>
          <a href="#">Testimonial</a>
        </div>
        <div className="navbar-logo">RADIAN</div>
        <div className="navbar-button">SIGN UP</div>
      </div>
    </div>
  );
}
