import { memo } from "react";
import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My education <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>FSc Pre-Engineering</h4>
                <h5>Pak Garrison Education System</h5>
              </div>
              <h3>2019 – 2021</h3>
            </div>
            <p>
              Nankana Sahib, Pakistan
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Self-Learning & Practical Development</h4>
                <h5>AI & Software Engineering</h5>
              </div>
              <h3>2022 – 2025</h3>
            </div>
            <p>
              Focused on Artificial Intelligence, Machine Learning, and real-world project development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Career);
