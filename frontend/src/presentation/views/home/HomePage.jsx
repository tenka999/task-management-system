import "@/styles/home-style.css";
import { useRef, useState } from "react";
import HeroSection from "./section/HeroSection";
// import { ReactComponent as Logo } from "/layout/background/svg-path.svg";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
