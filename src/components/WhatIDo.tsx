import { useEffect, useRef, memo } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const containers = containerRef.current;
    
    // Create a stable reference for the click handler to ensure proper removal
    const handleContainerClick = (e: MouseEvent) => {
      const container = e.currentTarget as HTMLDivElement;
      handleClick(container);
    };

    if (ScrollTrigger.isTouch) {
      containers.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", handleContainerClick);
        }
      });
    }
    return () => {
      containers.forEach((container) => {
        if (container) {
          container.removeEventListener("click", handleContainerClick);
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI & ML</h3>
              <h4>Specialization</h4>
              <p>
                Specializing in Machine Learning, TensorFlow, Computer Vision, and Model Optimization to build intelligent systems.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Machine Learning</div>
                <div className="what-tags">TensorFlow</div>
                <div className="what-tags">Computer Vision</div>
                <div className="what-tags">Data Preprocessing</div>
                <div className="what-tags">Feature Engineering</div>
                <div className="what-tags">Model Training</div>
                <div className="what-tags">Model Evaluation</div>
                <div className="what-tags">Python</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>SOFTWARE</h3>
              <h4>Development & Automation</h4>
              <p>
                Building robust systems, implementing workflow automation, and creating scalable web applications.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React.js</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Tailwind CSS</div>
                <div className="what-tags">C++</div>
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">RPA</div>
                <div className="what-tags">AI System Architecture</div>
                <div className="what-tags">Workflow Automation</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(WhatIDo);

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
