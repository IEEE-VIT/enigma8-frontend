import React from "react";
import "./Sponsors.styles.css";

import SponsorsLIST from "../../assets/sponsors/sponsorsList";
import SponsorsCard from "../../components/SponsorsCard/SponsorsCard.component";

import BackgroundLeft from "../../assets/home/bg-left.svg";
import BackgroundRight from "../../assets/home/bg-right.svg";
import BackgroundBottom from "../../assets/home/bg-bottom.svg";

// import EmptyTile from "../../assets/home/sponsor-empty-tile.svg";
import FooterNav from "../../components/FooterNav/FooterNav.component";

// import LinkImage from "../../components/LinkImage/LinkImage.component";

const Sponsors = () => {
  return (
    <div className="sponsors-page">
      <div className="sponsors-content">
        <div className="sponsorcard-container">
          <SponsorsCard
            img={SponsorsLIST.TitleSponsor.logo}
            title="TITLE SPONSOR"
            link={SponsorsLIST.TitleSponsor.link}
            type={1}
          />
          <SponsorsCard
            img={SponsorsLIST.PoweredBySponsor.logo}
            title="POWERED BY"
            link={SponsorsLIST.PoweredBySponsor.link}
            type={2}
          />
          <SponsorsCard
            img={SponsorsLIST.BlockchainPartnerLogo.logo}
            title="BLOCKCHAIN PARTNER"
            link={SponsorsLIST.BlockchainPartnerLogo.link}
            type={3}
          />
          <div className="sponsorcard-bag">
            <SponsorsCard
              img={SponsorsLIST.EnvPartnerLogo.logo}
              title="ENVIRONMENTAL PARTNER"
              link={SponsorsLIST.EnvPartnerLogo.link}
              type={4}
            />
            <SponsorsCard
              img={SponsorsLIST.FoodPartnerLogo.logo}
              title="FOOD PARTNER"
              link={SponsorsLIST.FoodPartnerLogo.link}
              type={4}
            />
            <SponsorsCard
              img={SponsorsLIST.GiftingPartnerLogo.logo}
              title="GIFTING PARTNER"
              link={SponsorsLIST.GiftingPartnerLogo.link}
              type={4}
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
              img={SponsorsLIST.PartnerALogo.logo}
              title=""
              link={SponsorsLIST.PartnerALogo.link}
              type={5}
            />
            <SponsorsCard
              img={SponsorsLIST.PartnerBLogo.logo}
              title=""
              link={SponsorsLIST.PartnerBLogo.link}
              type={5}
            />
            <SponsorsCard
              img={SponsorsLIST.PartnerCLogo.logo}
              title=""
              link={SponsorsLIST.PartnerCLogo.link}
              type={5}
            />
          </div>
          <div className="sponsorcard-bag">
            <SponsorsCard
              img={SponsorsLIST.DigitalPartnerALogo.logo}
              title="OUTREACH PARTNER"
              link={SponsorsLIST.DigitalPartnerALogo.link}
              type={6}
            />
            <SponsorsCard
              img={SponsorsLIST.DigitalPartnerBLogo.logo}
              title="DIGITAL PARTNER"
              link={SponsorsLIST.DigitalPartnerBLogo.link}
              type={7}
              paperClass="blockchain"
            />
          </div>
        </div>
        <img src={BackgroundBottom} className="sponsors-bg-bottom" alt="" />
      </div>
      <img src={BackgroundLeft} className="sponsors-bg-left" alt="" />
      <img src={BackgroundRight} className="sponsors-bg-right" alt="" />

      <FooterNav />
    </div>
  );
};

export default Sponsors;
