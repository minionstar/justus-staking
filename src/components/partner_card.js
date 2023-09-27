import React from 'react'
import TeraImage from "../assets/images/partner_logs/Tera-Block.svg"
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { FaReddit } from "react-icons/fa6";

export default function PartnerCard(props){
    const {image, name, socials, description, invPrice, invAmount} = props;
    return(
        <div className='bg-[#376eab] w-[50%] sm:w-[33%] rounded-xl '>
            <div className='flex flex-row p-5'>
                <img src={TeraImage} className='mr-5'/>
                <div className=''>
                    <p className='font-medium mb-5'>TeraBlock</p>
                    <ul className='flex flex-row gap-2 text-lg mb-5'>
                        <li>
                            <FaLinkedin />
                        </li>
                        <li>
                            <FaSquareTwitter />
                        </li>
                        <li>
                            <FaGlobe />
                        </li>
                        <li>
                            <FaMedium />
                        </li>
                        <li>
                            <FaTelegram />
                        </li>
                        <li>
                            <FaYoutube />
                        </li>
                        <li>
                            <FaDiscord />
                        </li>
                        <li>
                            <FaReddit />
                        </li>
                    </ul>
                    <p className='text-sm'>Description</p>
                </div>
            </div>
            <div className='flex flex-row justify-between p-5 bg-[#046bd3] rounded-b-xl'>
                <p>Investment price: $0.0369</p>
                <p>Investment price: $0.0369</p>
            </div>
        </div>
    )
}
