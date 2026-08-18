import "@/styles/testimonial-style.css";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Jamal",
    job: "CrossFit Coach",
    gear: "KINETIX PRO 750ml",
    city: "Lombok, Indonesia",
    image: "/layout/background/person-1.jpg",

    rating: 5,
    text: "Dropped it twice on the concrete gym floor, zero dents. Keeps my electrolyte drink ice-cold through 2-hour heavy lifting sessions.",
  },
  {
    id: 2,
    name: "Michael",
    job: "Ultra Trail Runner",
    gear: "RADIAN HEAVY 1000ml",
    city: "Tokyo",
    image: "/layout/background/person-2.jpg",

    rating: 5,
    text: "Survived a 20K mountain trail in sub-zero winds. No leaks in my hydration pack and the grip didn't slip once even with wet gloves.",
  },
  {
    id: 3,
    name: "David K.",
    job: "Urban Cyclist & Commuter",
    gear: "PULSE 01 550ml",
    city: "Singapore",
    image: "/layout/background/person-3.jpg",

    rating: 5,
    text: "Fits perfectly into my bike cage without rattling around. Cold coffee stays hot until my morning ride ends. Absolute essential.",
  },
];
export default function ExploreSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    loop: true,
    // skipSnaps: true,
    duration: 0,
  });
  const [activeIndex, setActiveIndex] = useState(2);
  const active = testimonials[activeIndex];
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;

    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const handlePrev = () => {
    next();
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleNext = () => {
    prev();
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();

    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  return (
    <div className="testimonial-section">
      <div className="testimonial-top">
        <div className="testimonial-text">
          Real feedback from athletes, trail runners, and daily commuters who
          push our gear to the limit every single day.
        </div>
        <div className="testimonial-title">
          <h4>OUT CUSTOMER</h4>
          <h3>TESTED BY THE RELENTLESS</h3>
        </div>
        <div className="testimonial-nav">
          <div className="nav-container">
            <div className={`nav ${!canPrev ? "" : ""} `} onClick={handlePrev}>
              <svg
                width="34"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L11 6M5 12L11 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={`nav ${!canNext ? "" : ""} `} onClick={handleNext}>
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonial-bottom">
        <div className="testimonial-bottom-left">
          <div className="testimonial-embla" ref={emblaRef}>
            <div className="testimonial-embla__container">
              {testimonials.map((item, index) => (
                <div className="testimonial-embla__slide" key={index}>
                  <div className="testimonial-card">
                    <div className="testimonial-img">
                      <img src={item.image} alt="" />
                    </div>

                    {/* <div className="product-info">
                    <div className="product-info-top">
                      <h3>{item.name}</h3>

                      <span style={{ color: item.color }}>{item.price}</span>
                    </div>
                    <div className="product-info-bottom">
                      <p>{item.description}</p>
                    </div>
                  </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testimonial-user">
            <p>
              {active.name} | <span>{active.job}</span>
            </p>
            <div className="testimonial-gear">{active.gear}</div>
          </div>
        </div>

        <div className="testimonial-bottom-center">
          <div className="testimonial-img">
            <img src={active.image} alt="" />
          </div>
        </div>
        <div className="testimonial-bottom-right">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M -2 62 C -2 39 9 22 33 22 V 38 C 20 38 14 47 14 58 H 33 V 98 H -2 V 62 Z M 47 62 C 47 39 58 22 82 22 V 38 C 69 38 63 47 63 58 H 82 V 98 H 47 V 62 Z"
              fill="#00000031"
            />
          </svg>
          <h3>{active.text}</h3>
        </div>
      </div>
    </div>
  );
}
