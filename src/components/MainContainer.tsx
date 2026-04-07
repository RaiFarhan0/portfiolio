import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import setSplitText from "./utils/splitText";

const About = lazy(() => import("./About"));
const Career = lazy(() => import("./Career"));
const Contact = lazy(() => import("./Contact"));
const WhatIDo = lazy(() => import("./WhatIDo"));
const Work = lazy(() => import("./Work"));
const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  // Empty deps: resizeHandler reads window.innerWidth at call-time,
  // so re-running the effect on every state change is unnecessary and
  // caused setSplitText() to fire twice on each resize breakpoint crossing.
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Landing>{!isDesktopView && children}</Landing>
          <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {(isDesktopView || window.innerWidth >= 768) && <TechStack />}
            <Contact />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
