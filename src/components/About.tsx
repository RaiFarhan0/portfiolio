import { memo } from "react";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a highly motivated and focused Computer Science student with a strong interest in software development and complex problem-solving. I specialize in Artificial Intelligence and Machine Learning, building intelligent systems and automation tools from scratch. I continuously explore emerging technologies, refine my technical skills, and adapt quickly to new challenges. I am currently focused on self-learning and practical implementation of AI systems to build real-world solutions.
        </p>
        <div className="about-languages">
          <span><b>Urdu</b> (Native)</span>
          <span><b>English</b> (C2 Proficiency)</span>
        </div>
      </div>
    </div>
  );
};

export default memo(About);
