import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image} alt={props.alt} />
        {props.video && isHovered && (
          <video 
            src={props.video} 
            autoPlay 
            muted 
            playsInline 
            loop 
            className="work-hover-video"
          ></video>
        )}
      </a>
    </div>
  );
};

export default WorkImage;
