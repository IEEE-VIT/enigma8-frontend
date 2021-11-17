import React from "react";
import "./Sponsors.styles.css";

import SponsorsCard from "../../components/SponsorsCard/SponsorsCard.component";

import BackgroundLeft from "../../assets/home/bg-left.svg";
import BackgroundRight from "../../assets/home/bg-right.svg";

import TitleSponsor from "../../assets/home/sponsor-titlesponsor.svg";
import PowerdBySponsor from "../../assets/home/sponsor-poweredby.svg";
import GiftingPartner from "../../assets/home/sponsor-gifting-partner.svg";
import EnvPartner from "../../assets/home/sponsor-env-partner.svg";
// import IPRPartner from "../../assets/home/ipr-partner.svg";
import BlockchainPartner from "../../assets/home/sponsor-blockchain-partner.svg";
import PartnerA from "../../assets/home/sponsor-partner-a.svg";
import PartnerB from "../../assets/home/sponsor-partner-b.svg";
import PartnerC from "../../assets/home/sponsor-partner-c.svg";

import DigitalPartnerA from "../../assets/home/sponsor-digital-partner-a.svg";
import DigitalPartnerB from "../../assets/home/sponsor-digital-partner-b.svg";

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
            img={EnvPartner}
            title="ENVIRONMENTAL PARTNER"
            e
            link="https://www.bysmita.in/"
            type={3}
          />
          <SponsorsCard
            img={BlockchainPartner}
            title="BLOCKCHAIN PARTNER"
            link="https://dhiway.com/"
            type={3}
          />
          <SponsorsCard
            img={GiftingPartner}
            title="GIFTING PARTNER"
            link="https://offostore.com/"
            type={3}
          />
          {/* <SponsorsCard
            img={EmptyTile}
            title="CONNECTION PARTNERS"
            link=""
            type={3}
          /> */}
        </div>
        <SponsorsCard img={" "} title="PARTNERS" link="" type={0} />
        <div className="sponsorcard-bag">
          <SponsorsCard
            img={PartnerA}
            title=""
            link="https://gen.xyz/"
            type={3}
          />
          <SponsorsCard
            img={PartnerB}
            title=""
            link="https://bit.ly/3aLF5vB"
            type={3}
          />
          <SponsorsCard
            img={PartnerC}
            title=""
            link="https://replit.com/"
            type={3}
          />
        </div>
        <SponsorsCard img={" "} title="DIGITAL PARTNERS" link="" type={0} />
        <div className="sponsorcard-bag">
          <SponsorsCard
            img={DigitalPartnerA}
            title=""
            link="https://collegeinsider.in/"
            type={4}
          />
          <SponsorsCard
            img={DigitalPartnerB}
            title=""
            link="https://moroesports.com/"
            type={4}
          />
        </div>
      </div>
      <img src={BackgroundLeft} className="home-bg-left" alt="" />
      <img src={BackgroundRight} className="home-bg-right" alt="" />
      <FooterNav />
    </div>
  );
};

export default Sponsors;
