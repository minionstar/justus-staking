import React, { useState } from "react";
import TeraImage from "../../assets/images/partner_logs/Tera-Block.svg";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { FaReddit } from "react-icons/fa6";
import Icon from "react-crypto-icons";

export default function PartnerCard(props) {
  const {
    image,
    name,
    socials,
    description,
    invPrice,
    invAmount,
    setShowModal,
  } = props;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-[#376eab] rounded-xl ">
      <div className="flex flex-col sm:flex-row items-center sm:items-start p-5 w-full">
        <div className="relative sm:mr-3 w-48">
          <img
            src={TeraImage}
            className="w-full"
            onLoad={() => setLoaded({ loaded: true })}
          />
          {!loaded && (
            <div className="h-0 pb-[100%] w-full image-thumbnail rounded-lg bg-gray-700 animate-pulse flex items-center justify-center absolute top-0">
                <span className="pt-[100%]">TeraBlock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <p className="font-medium mb-5  mt-5 sm:mt-0 ">TeraBlock</p>
            <Icon name="bnb" size={25} />
          </div>

          <div className="flex flex-row gap-2 mb-5 text-lg w-full">
            <FaLinkedin className="cursor-pointer" />

            <FaSquareTwitter className="cursor-pointer" />

            <FaGlobe className="cursor-pointer" />

            <FaMedium className="cursor-pointer" />

            <FaTelegram className="cursor-pointer" />

            <FaYoutube className="cursor-pointer" />

            <FaDiscord className="cursor-pointer" />

            <FaReddit className="cursor-pointer" />
          </div>
          <div className="grid">
            <span className="line-clamp-3 break-words text-sm">
              DescriptionDescriptionDescriptionDescriptionDescriptionDescripDescriptionDescriptionDescriptionDescriptionDescriptionDescripDescriDescriptionDescriptionDescriptionDescriptionDescriptionDescripDescriptionDescriptionDescriptionDescriptionDescriptionDescripDescri
            </span>
            <div className="flex justify-end">
              <span
                className="text-blue-300 cursor-pointer inline-block"
                onClick={() => setShowModal(true)}
              >
                Read More
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between p-5 bg-[#046bd3] rounded-b-xl text-sm">
        <p>Investment price: $0.0369</p>
        <p>Investment price: $0.0369</p>
      </div>
    </div>
  );
}
