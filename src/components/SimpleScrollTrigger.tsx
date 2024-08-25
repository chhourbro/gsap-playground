import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "../styles/SimpleScrollTrigger.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SimpleScrollTrigger() {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  useGSAP(
    () => {
      // Play a timeline when the element enters the viewport
      gsap.to(".a", {
        scrollTrigger: ".a",
        x: 400,
        rotation: -360,
        duration: 6,
        markers: true
      });



      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: ".b",
          start: "start 80%",
          end: "bottom 20%",
          scrub: 1,
          markers: true,
          id: "scrub"
        }
      });
      tl.current
        .to(".b", {
          duration: 2,
          x: 400,
          rotation: 360
        })
        .to(".b", {
          duration: 3,
          scale: 5
        });


      gsap.to(".c", {
        scrollTrigger: {
          trigger: ".c",
          toggleActions: "play pause reverse none",
          // markers: true,
        },
        x: 400,
        rotation: 360,
        duration: 3,
        start: "top center",
        end: "top 100px",
        toggleClass: "active"
      });

      // // Or you can attach a tween or timeline to a ScrollTrigger later
      // const anim = gsap.to(".c", {
      //   x: 400,
      //   rotation: 360,
      //   duration: 3
      // });


      // ScrollTrigger.create({
      //   trigger: ".c",
      //   animation: anim,
      //   // Uncomment these to see how they affect the ScrollTrigger
      //   // markers: true,
      //   start: "top center",
      //   end: "top 100px",
      //   toggleClass: "active"
      //   // pin: true,
      //   // scrub: 1,
      //   // onUpdate: self => {
      //   //   console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
      //   // }
      // });
    },
    { scope: container }
  );

  return (
    <div className="simple-scroll-trigger" ref={container}>
      <div className="box purple a">a</div>
      <div className="box green b">b</div>
      <div className="box ghost">c</div>
      <div className="box orange c">c</div>

      <div className="line"></div>
    </div>
  );
}
