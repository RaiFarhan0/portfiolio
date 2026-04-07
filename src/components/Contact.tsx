import { memo } from "react";
import { MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-flex">
        <div className="contact-box">
          <h3>Contact</h3>
          <div>
            <h4>Email</h4>
            <p>
              <a href="mailto:raifarhan003@gmail.com" data-cursor="disable">
                raifarhan003@gmail.com
              </a>
            </p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>
              <a href="tel:+923008582139" data-cursor="disable">
                +92 3008582139
              </a>
            </p>
          </div>
        </div>
        <div className="contact-box">
          <h2>
            Designed and Developed <br /> by <span>Rai Farhan</span>
          </h2>
          <h5>
            <MdCopyright /> 2026
          </h5>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);
