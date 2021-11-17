import React from "react";
import "./Sponsors.styles.css";

import SponsorsCard from "../../components/SponsorsCard/SponsorsCard.component";

import BackgroundLeft from "../../assets/home/bg-left.svg";
import BackgroundRight from "../../assets/home/bg-right.svg";

import TitleSponsor from "../../assets/home/title-sponsor.svg";
import PowerdBySponsor from "../../assets/home/powered-by.svg";
// import DigitalPartner from "../../assets/home/digital-partner.svg";
// import IPRPartner from "../../assets/home/ipr-partner.svg";
import BlockchainPartner from "../../assets/home/blockchain-partner.svg";
// import EmptyTile from "../../assets/home/sponsor-empty-tile.svg";
import FooterNav from "../../components/FooterNav/FooterNav.component";

// import LinkImage from "../../components/LinkImage/LinkImage.component";

const Sponsors = () => {
  return (
    <div className="sponsors-page">
      <div className="sponsorcard-container">
        <SponsorsCard
          img={TitleSponsor}
          title="TITLE SPONSOR"
          link="https://www.accolite.com/"
          type={1}
        />
        <SponsorsCard
          img={PowerdBySponsor}
          title="POWERED BY"
          link="https://unicreds.com/"
          type={2}
        />
        <div className="sponsorcard-bag">
          <SponsorsCard
            img={BlockchainPartner}
            title="BLOCKCHAIN PARTNERS"
            link="https://dhiway.com/"
            type={3}
          />
          {/* <SponsorsCard
            img={EmptyTile}
            title="CONNECTION PARTNERS"
            link=""
            type={3}
          />
          <SponsorsCard
            img={EmptyTile}
            title="GIFTING PARTNERS"
            link=""
            type={3}
          /> */}
        </div>
        {/* <SponsorsCard img={" "} title="PARTNERS" link="" type={4} /> */}
        {/* <div className="sponsorcard-bag">
          <SponsorsCard img={EmptyTile} title="" link="" type={4} />
          <SponsorsCard img={EmptyTile} title="" link="" type={4} />
          <SponsorsCard img={EmptyTile} title="" link="" type={4} />
        </div> */}
      </div>
      <img src={BackgroundLeft} className="home-bg-left" alt="" />
      <img src={BackgroundRight} className="home-bg-right" alt="" />
      <FooterNav />
    </div>
  );
};

export default Sponsors;
