import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Suggestion: Use a beautiful modern palette
// Background: Soft Cool Blue (`#7BDFF2`)
// Accent/Description: Pale Lavender (`#B2A4FF`)

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // animate the divs
  useGSAP(() => {
    gsap.utils.toArray(".elem img").forEach((img, i) => {
      // Alternate left/right movement
      const xMove = i % 2 === 0 ? -100 : 100;

      // =========================
      // 1. CENTER LEFT-RIGHT MOVE
      // =========================
      gsap.to(img, {
        x: xMove,
        ease: "none",

        scrollTrigger: {
          trigger: img,

          // Start when image reaches center
          start: "top center",

          // End after passing center
          end: "bottom center",

          scrub: 1,
        },
      });

      // =========================
      // 2. TOP SCALE DOWN + HIDE
      // =========================
      gsap.to(img, {
        scale: 0,
        opacity: 0,
        transformOrigin: "top center",
        ease: "power2.out",

        scrollTrigger: {
          trigger: img,

          // Start when image reaches top
          start: "top top",

          // Finish slightly above top
          end: "bottom top",

          scrub: 1,
        },
      });
    });
  });

  // lets animate banner text
  useGSAP(() => {
    gsap.to(".banner", {
      opacity: 0,
      scale: 0.7,
      y: -150,
      ease: "none",

      scrollTrigger: {
        trigger: ".description",

        start: "top bottom",

        end: "top center",

        scrub: 1,
      },
    });
  });
  return (
    <>
      <div className="w-full" style={{ backgroundColor: "#7BDFF2" }}>
        {/*
          Use an array to generate the grid cells. 
          We'll randomize the --c value (from 1~8 as columns).
        */}
        <div className="grid grid-cols-8 grid-rows-20 gap-2 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => {
            // For demonstration, randomly assign column (1-8) and row (1-24)
            const c = Math.floor(Math.random() * 8) + 1;
            const r = (i % 24) + 1; // Keep row spread visually similar to original
            return (
              <div
                key={i}
                className="elem col-span-1 row-span-1"
                style={{ "--r": r, "--c": c }}
              >
                <img src="/img.jpg" alt="img" />
              </div>
            );
          })}
        </div>

        {/* banner text area */}
        <div className="banner fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center pointer-events-none h-screen">
          <h1 className="text-5xl font-bold text-white drop-shadow-md uppercase">
            Thomas Vance
          </h1>
          <h2 className="text-4xl text-white drop-shadow-md uppercase font-semibold">
            トーマス・ヴァンス
          </h2>
        </div>
      </div>

      {/* description area */}
      <div
        className="description h-screen w-full flex items-center justify-center"
        style={{ backgroundColor: "#B2A4FF" }}
      >
        <p className="text-black text-center text-2xl font-bold w-3/4">
          Welcome to the digital space of Thomas Vance. As a multidisciplinary
          designer and developer, Thomas crafts unique visual experiences for
          the web and beyond. His portfolio stands as a testament to a passion
          for creative problem-solving and innovative technology. Explore his
          original works, collaborations, and thoughts on design process and
          digital art. Connect with Thomas Vance to discover more about his
          journey and services.
        </p>
      </div>
    </>
  );
}

export default App;
