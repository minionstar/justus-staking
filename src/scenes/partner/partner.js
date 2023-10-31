import React, { useState } from "react";
import PartnerCard from "./partner_card";
import PartnerModalBnb from "../../components/modalBnb";
import PartnerModalUsdc from "../../components/modalUsdc";
import PartnerModalCake from "../../components/modalCake";
import PartnerModalUsdt from "../../components/modalUsdt";
import PartnerModalJtt from "../../components/modalJtt";

import BnbImage from "../../assets/images/partner_logs/bnb-logo.svg";
import CakeImage from "../../assets/images/partner_logs/cake-logo.svg";
import UsdcImage from "../../assets/images/partner_logs/usdc-logo.svg";
import UsdtImage from "../../assets/images/partner_logs/usdt-logo.png";
import JttImage from "../../assets/images/partner_logs/jtt-token.png";
import {
  BNB_ADDRESS,
  USDC_ADDRESS,
  CAKE_ADDRESS,
  USDT_ADDRESS,
  JTT_ADDRESS,
} from "../../constants/address";

import {
  USDT_DECIMAL,
  USDC_DECIMAL,
  JTT_DECIMAL,
  BNB_DECIMAL,
  CAKE_DECIMAL,
} from "../../constants/decimal";

export default function PartnerComponent() {
  const [showBNBModal, setBNBShowModal] = useState(false);
  const [showUSDCModal, setUSDCShowModal] = useState(false);
  const [showCAKEModal, setCAKEShowModal] = useState(false);
  const [showUSDTModal, setUSDTShowModal] = useState(false);
  const [showJTTModal, setJTTShowModal] = useState(false);
  return (
    <div className="w-full flex flex-col p-5  pt-10">
      <p className="text-xl mb-5 font-semibold">Partners</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <PartnerCard
          setShowModal={setBNBShowModal}
          image={BnbImage}
          tokenAddr={BNB_ADDRESS}
          text="BNB"
          decimal={BNB_DECIMAL}
        />
        <PartnerCard
          setShowModal={setCAKEShowModal}
          image={CakeImage}
          tokenAddr={CAKE_ADDRESS}
          text="CAKE"
          decimal={CAKE_DECIMAL}
        />
        <PartnerCard
          setShowModal={setUSDCShowModal}
          image={UsdcImage}
          tokenAddr={USDC_ADDRESS}
          text="USDC"
          decimal={USDC_DECIMAL}
        />
        <PartnerCard
          setShowModal={setUSDTShowModal}
          image={UsdtImage}
          tokenAddr={USDT_ADDRESS}
          text="USDT"
          decimal={USDT_DECIMAL}
        />
        <PartnerCard
          setShowModal={setJTTShowModal}
          image={JttImage}
          tokenAddr={JTT_ADDRESS}
          text="JTT"
          decimal={JTT_DECIMAL}
        />
      </div>
      <PartnerModalBnb
        showModal={showBNBModal}
        setShowModal={setBNBShowModal}
      />
      <PartnerModalUsdc
        showModal={showUSDCModal}
        setShowModal={setUSDCShowModal}
      />
      <PartnerModalCake
        showModal={showCAKEModal}
        setShowModal={setCAKEShowModal}
      />
      <PartnerModalUsdt
        showModal={showUSDTModal}
        setShowModal={setUSDTShowModal}
      />
      <PartnerModalJtt
        showModal={showJTTModal}
        setShowModal={setJTTShowModal}
      />
    </div>
  );
}
