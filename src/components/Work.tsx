import { memo, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    name: "AI-Driven Text-to-Handwriting Generation Model",
    category: "Lead Developer",
    tools: "Python, TensorFlow, Computer Vision",
    desc: "Developed a deep learning model that converts digital text into realistic human-like handwriting with support for multiple styles.",
    img: "/images/text_to_handwriting.png"
  },
  {
    name: "SkillMap – AI-Powered Resource Allocation System",
    category: "Backend Developer & System Architect",
    tools: "Python, JSON/SQL, Automation",
    desc: "Built an intelligent system that assigns tasks based on developer skills, improving workflow efficiency and reducing manual errors.",
    img: "/images/skillmap_system.png"
  }
];

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      if (!containerRef.current) return;
      const workFlex = containerRef.current.querySelector(".work-flex") as HTMLElement;
      if (!workFlex) return;
      
      const totalWidth = workFlex.scrollWidth;
      const visibleWidth = window.innerWidth;
      
      translateX = Math.max(0, totalWidth - visibleWidth + 20); // Minimal buffer
    }

    setTranslateX();

    let workTrigger: ScrollTrigger | undefined;

    // Only create pinning if there's horizontal content
    if (translateX > 0) {
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".work-flex", "skewX", "deg");
      const clamp = gsap.utils.clamp(-20, 20);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${translateX}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          id: "work",
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -400);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.8,
                ease: "power3",
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew)
              });
            }
          },
        },
      });

      timeline.to(".work-flex", {
        x: () => -translateX,
        ease: "none",
      });

      const boxes = gsap.utils.toArray<HTMLElement>(".work-box");
      boxes.forEach((box) => {
        const image = box.querySelector(".work-image img");
        if (image) {
          timeline.to(image, {
            x: -100,
            ease: "none",
          }, 0);
        }

        const reveals = box.querySelectorAll(".work-info h3, .work-info h4, .work-info p");
        if (reveals.length) {
          gsap.to(reveals, {
            scrollTrigger: {
              trigger: box,
              containerAnimation: timeline,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          });
        }
      });
      
      workTrigger = ScrollTrigger.getById("work");
    } else {
      // Small reveal if no horizontal scroll
      gsap.to(".work-info h3, .work-info h4, .work-info p", {
        scrollTrigger: {
          trigger: ".work-section",
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });
    }

    const refreshAll = () => {
      setTranslateX();
      ScrollTrigger.refresh();
      
      // Ensure visibility even if scroll is stuck
      if (translateX <= 0) {
        gsap.to(".work-info h3, .work-info h4, .work-info p", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          overwrite: "auto"
        });
      }
    };

    ScrollTrigger.addEventListener("refreshInit", setTranslateX);
    window.addEventListener("load", refreshAll);
    window.addEventListener("resize", refreshAll);
    
    const timeout = setTimeout(refreshAll, 1000);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", setTranslateX);
      window.removeEventListener("load", refreshAll);
      window.removeEventListener("resize", refreshAll);
      clearTimeout(timeout);
      workTrigger?.kill(true);
      ScrollTrigger.getById("work")?.kill(true);
    };
  }, { scope: containerRef, dependencies: [] });

  return (
    <div className="work-section" id="work" ref={containerRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}<br/><br/>{project.desc}</p>
              </div>
              <WorkImage image={project.img || "/images/placeholder.webp"} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Work);
