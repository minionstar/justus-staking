import React from "@heroicons/react";
import { useState } from "react";
import { TooltipComponent } from "../../components/tooltip";
import { showTokenBalance } from "../../utils";
import { USDT_DECIMAL } from "../../constants/decimal";
import { Spinner } from "@material-tailwind/react";
import { useContractRead } from "wagmi";
import { StakingContractABI, tokenABI } from "../../constants/abis";
import Icon from "../../components/crypto_icons";
export default function UnstakedRewardCard(props) {
  const { account, rewardTokenAddr, StakingContractAddr } = props;
  const { data: earnedReward, isLoading: isLoadingEarneddBalance } =
    useContractRead({
      address: StakingContractAddr,
      abi: StakingContractABI,
      functionName: "earned",
      args: [account, rewardTokenAddr],
    });

  const { data: tokenSymbol } = useContractRead({
    address: rewardTokenAddr,
    abi: tokenABI,
    functionName: "symbol",
  });

  return (
    <div className="bg-[#376eab] mb-5 rounded-xl">
      <div className="flex flex-row items-center  w-[100%] text-center">
        <div className="flex flex-row items-center w-[100%] text-center">
          <Icon symbol={tokenSymbol} />
          <div className="ml-2">
            {isLoadingEarneddBalance ? (
              <div className="h-6 w-12 image-thumbnail rounded-sm bg-secondary animate-pulse flex items-center justify-center"></div>
            ) : (
              <p className="text-lg text-start">
                {showTokenBalance(earnedReward, USDT_DECIMAL) +
                  " " +
                  tokenSymbol}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
