import React from "react";
import "./DownloadApps.styles.css";

import EnimgaBrand from "../../assets/mobile/enigma.svg";
// import Background from "../../assets/mobile/bg.svg";
import Google from "../../assets/mobile/googleplay.svg";
import apple from "../../assets/mobile/appstore.svg";
import LinkImage from "../../components/LinkImage/LinkImage.component";

const DownloadApps = () => {
  return (
    <div className="home-mobile">
      <a href="/">
        <img src={EnimgaBrand} alt="" className="mobile-img" />
      </a>

      <div className="mobile-center">
        <div className="text">Download our Apps to Play Enigma on mobile!</div>
        <LinkImage
          link="https://play.google.com/store/apps/details?id=com.ieeevit.enigma8"
          img={Google}
          linkClass="footer-social-link"
          imgClass="download-app app-google"
        />
        <LinkImage
          link="https://apps.apple.com/in/app/enigma-8-0/id1596348102"
          img={apple}
          linkClass="footer-social-link"
          imgClass="download-app app-apple"
        />
      </div>
    </div>
  );
};

export default DownloadApps;
