import "@/styles/hero-style.css";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="hero-section">
      <div className=""></div>
      <Button>Get Started</Button>
      <div className="stat-card">
        <svg
          className="stat-card__frame"
          viewBox="0 0 300 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon
            points="40,4 260,4 296,35 296,105
                  260,136 40,136 4,105 4,35"
            fill="#102c56"
            stroke="#102c56"
            strokeWidth="5"
          />
          <polygon
            points="45,12 255,12 288,39 288,101
                  255,128 45,128 12,101 12,39"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>

        <div className="stat-card__content">
          <h2>HE</h2>
          <p>aaaaaaa</p>
        </div>
      </div>
    </div>
  );
}
