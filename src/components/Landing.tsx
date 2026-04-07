import { PropsWithChildren, memo } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>AI Developer Building Intelligent Systems</h2>
            <h1>
              RAI
              <br />
              <span>FARHAN</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>I design and develop AI-powered applications, automation systems, and machine learning solutions that solve real-world problems.</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI</div>
              <div className="landing-h2-2">ML</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default memo(Landing);
