import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { memo } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <a 
        className="resume-button" 
        href="/Rai_Farhan_Resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Download Resume"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default memo(SocialIcons);
