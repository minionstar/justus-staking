import React, { useState } from "react";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { useContractReads } from "wagmi";
import { ethers } from "ethers";
import {
  JustusStakingContractAddr,
  LPStakingContractAddr,
} from "../../constants/address";
import { StakingContractABI } from "../../constants/abis";
import { showTokenBalance, showDateFormatted } from "../../utils";

export default function Partner(props) {
  const { avatar, tokenAddr, setShowModal, text, decimal } = props;
  const [loaded, setLoaded] = useState(false);
  const currentTimeStamp = Date.now();
  const [jttRestReward, setJttRestReward] = useState(0);
  const [lpRestReward, setLPRestReward] = useState(0);

  const { data: rewardData } = useContractReads({
    enabled: true,
    watch: true,
    contracts: [
      {
        address: JustusStakingContractAddr,
        abi: StakingContractABI,
        functionName: "rewardData",
        args: [tokenAddr],
      },
      {
        address: LPStakingContractAddr,
        abi: StakingContractABI,
        functionName: "rewardData",
        args: [tokenAddr],
      },
    ],
    onSuccess() {
      const jttRewardData = rewardData[0].result;
      const jttRewardRate = ethers.utils.formatUnits(
        jttRewardData[3].toString(),
        decimal
      );
      const jttRewardExitTime =
        ethers.utils.formatUnits(jttRewardData[2].toString(), 0) * 1000;
      if (jttRewardExitTime > currentTimeStamp) {
        const restJttReward =
          (jttRewardRate * (jttRewardExitTime - currentTimeStamp)) / 1000;
        setJttRestReward(restJttReward);
      }

      const lpRewardData = rewardData[1].result;
      const lpRewardRate = ethers.utils.formatUnits(
        lpRewardData[3].toString(),
        decimal
      );
      const lpRewardExitTime =
        ethers.utils.formatUnits(lpRewardData[2].toString(), 0) * 1000;
      if (lpRewardExitTime > currentTimeStamp) {
        const restLpReward =
          (lpRewardRate * (lpRewardExitTime - currentTimeStamp)) / 1000;
        setLPRestReward(restLpReward);
      }
    },
  });
  return (
    <div className="bg-[#376eab] rounded-xl flex flex-col">
      <div className="flex flex-col sm:flex-row items-center sm:items-start p-5 w-full">
        <div
          className={
            !loaded ? "relative sm:mr-3 w-48 pt-45 " : "relative sm:mr-3 w-48"
          }
        >
          <img
            src={avatar}
            className="w-full"
            onLoad={() => setLoaded({ loaded: true })}
            alt="card_avatar"
          />
          {!loaded && (
            <div className="h-0 pb-[100%] w-full image-thumbnail rounded-lg bg-gray animate-pulse flex items-center justify-center absolute top-0">
              <span className="pt-[100%]">{text}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <p className="font-medium mb-5  mt-5 sm:mt-0 ">{text}</p>
          </div>

          <div className="flex flex-row gap-2 mb-5 text-lg w-full">
            <a
              href="https://www.youtube.com/@Justus-Token"
              target="_blank"
              rel="noreferrer"
            >
              <FaSquareTwitter className="cursor-pointer" />
            </a>
            <a href="https://justustoken.com/" target="_blank" rel="noreferrer">
              <FaGlobe className="cursor-pointer" />
            </a>
            <a
              href="https://medium.com/@JustusToken"
              target="_blank"
              rel="noreferrer"
            >
              <FaMedium className="cursor-pointer" />
            </a>
            <a href="https://t.me/justustoken" target="_blank" rel="noreferrer">
              <FaTelegram className="cursor-pointer" />
            </a>
            <a
              href="https://www.youtube.com/@Justus-Token"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className="cursor-pointer" />
            </a>
            <a
              href="https://discord.gg/justustoken"
              target="_blank"
              rel="noreferrer"
            >
              <FaDiscord className="cursor-pointer" />
            </a>
          </div>
          <div className="grid">
            <span className="line-clamp-3 break-words text-sm">
              Justus is an innovative blockchain platform aiming to
              revolutionize decentralized finance. As part of its introductory
              strategy, Justus has announced plans to incentivize users by
              offering {text}, the native cryptocurrency of the Binance
              ecosystem, for staking Justus tokens. This approach is set to
              encourage early adoption and participation within the Justus
              community, fostering a vibrant and engaged user base. By providing
              users with the opportunity to earn {text} through staking Justus
              tokens, the platform aims to not only enhance its user base but
              also promote the broader utility and value proposition of both{" "}
              {text} and the Justus token within the growing landscape of
              decentralized finance.{" "}
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
      <div className="grow block bg-[#046bd3] rounded-b-xl">
        <div className="flex flex-row justify-between p-5  text-sm">
          <div>
            <p>Total to distribute:</p>
            <p className="text-md">
              JTT Staking : {showTokenBalance(jttRestReward, 0, true)} BNB
            </p>
            <p className="text-md">
              LP Staking : {showTokenBalance(lpRestReward, 0, true)} BNB
            </p>
          </div>
          <div>
            <p>Distribution period:</p>
            <p className="text-md text-right">
              {showDateFormatted(rewardData ? rewardData[0]?.result[2] : 0)}{" "}
            </p>
            <p className="text-md text-right">
              {showDateFormatted(rewardData ? rewardData[1]?.result[2] : 0)}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
