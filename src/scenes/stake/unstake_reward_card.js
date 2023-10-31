import React from "@heroicons/react";
import { showTokenBalance } from "../../utils";
import { useContractRead } from "wagmi";
import { StakingContractABI, tokenABI } from "../../constants/abis";
import Icon from "../../components/crypto_icons";
import { Decimals } from "../../constants/decimal";
export default function UnstakedRewardCard(props) {
  const { account, rewardTokenAddr, StakingContractAddr, index } = props;
  const { data: earnedReward, isLoading: isLoadingEarneddBalance } =
    useContractRead({
      address: StakingContractAddr,
      abi: StakingContractABI,
      functionName: "earned",
      args: [account, rewardTokenAddr],
      watch: true,
    });

  const { data: tokenSymbol } = useContractRead({
    watch: true,
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
                {showTokenBalance(earnedReward, Decimals[index]) +
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
