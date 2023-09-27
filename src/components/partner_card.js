import React from "react";
import TeraImage from "../assets/images/partner_logs/Tera-Block.svg";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { FaReddit } from "react-icons/fa6";

export default function PartnerCard(props) {
  const { image, name, socials, description, invPrice, invAmount } = props;
  return (
    <div className="bg-[#376eab] rounded-xl ">
      <div className="flex flex-col sm:flex-row items-center p-5 w-full">
        <img src={TeraImage} className="inline-block sm:mr-5" />
        <div className="flex flex-col w-full">
          <p className="font-medium mb-5  mt-5 sm:mt-0 ">TeraBlock</p>
          <div className="flex flex-row gap-2 mb-5 text-lg w-full">
            <FaLinkedin className="cursor-pointer"/>

            <FaSquareTwitter  className="cursor-pointer"/>

            <FaGlobe  className="cursor-pointer"/>

            <FaMedium  className="cursor-pointer"/>

            <FaTelegram  className="cursor-pointer"/>

            <FaYoutube  className="cursor-pointer"/>

            <FaDiscord  className="cursor-pointer"/>

            <FaReddit  className="cursor-pointer"/>
          </div>
          <div className="grid">
            <span className="line-clamp-3 break-words text-sm">
              DescriptionDescriptionDescriptionDescriptionDescriptionDescripDescriptionDescriptionDescriptionDescriptionDescriptionDescripDescriDescriptionDescriptionDescriptionDescriptionDescriptionDescripDescriptionDescriptionDescriptionDescriptionDescriptionDescripDescri
            </span>
            <div className="flex justify-end">
              <span className="text-blue-300 cursor-pointer inline-block">
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
