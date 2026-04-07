import { useEffect, memo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
import { smoother, setSmoother } from "./utils/smoother";

const Navbar = () => {
  useEffect(() => {
    const instance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });
    setSmoother(instance);

    if (smoother) {
      smoother.scrollTop(0);
      smoother.paused(true);
    }

    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    const handleClick = (e: MouseEvent) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const section = target.getAttribute("data-href");
        if (section && smoother) {
          smoother.scrollTo(section, true, "top top");
        }
      }
    };

    links.forEach((link) => link.addEventListener("click", handleClick));

    const onResize = () => ScrollSmoother.refresh(true);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Rai Farhan
        </a>
        <a
          href="mailto:raifarhan003@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          raifarhan003@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default memo(Navbar);
