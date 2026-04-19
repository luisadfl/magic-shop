import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://pbs.twimg.com/media/GOr27hWWsAIycpA?format=jpg&name=4096x4096)",
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <Link to="/sign-up" className="inline-block absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className={`${styles.button}`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Cadastre-se  
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
