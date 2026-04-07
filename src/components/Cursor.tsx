import { useEffect, useRef, memo } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        xSetter(cursorPos.x);
        ySetter(cursorPos.y);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const interactiveElements = document.querySelectorAll("[data-cursor]");
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();

      if (target.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        xSetter(rect.left);
        ySetter(rect.top);
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (target.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    interactiveElements.forEach((item) => {
      item.addEventListener("mouseover", handleMouseOver as EventListener);
      item.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      interactiveElements.forEach((item) => {
        item.removeEventListener("mouseover", handleMouseOver as EventListener);
        item.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default memo(Cursor);
