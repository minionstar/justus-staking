import React, { useEffect, useState } from "react";
import StakedAmountCard from "../stake/staked_amount_card";
import IconTotalStakedToken from "../../assets/images/icons/total-token-staked.png";
import ChartComponent from "../../components/chart";
import IconTotalTokensTVL from "../../assets/images/icons/IconTotalTokenSTVL.png";
import IconTotalLiquidity from "../../assets/images/icons/IconTotalLiquidity.png";
import IconMarketCap from "../../assets/images/icons/market-cap.png";
import IconLPTVL from "../../assets/images/icons/IconLPTVL.png";
import IconBNBJustusPrice from "../../assets/images/icons/IconETHJustusPrice.png";
import IconTotalJustusTVL from "../../assets/images/icons/IconTotalJustusTVL.png";
import IconTotalLPStake from "../../assets/images/icons/IconTotalLPStake.png";
import IconTotalStakePercent from "../../assets/images/icons/IconTotalStakePercent.png";
import { useAccount, useChainId, useContractRead } from "wagmi";
import axios from "axios";
import { ethers } from "ethers";
import {
  JustusStakingContractAddr,
  JustusTokenAddr,
  JustusTokenAddrBNB,
  LPTokenAddr,
  LPStakingContractAddr,
} from "../../constants/address";
import { StakingContractABI, tokenABI } from "../../constants/abis";

export default function Dashboard(props) {
  const { icon, balance, text } = props;
  const { address } = useAccount();
  const [tokenPrice, setTokenPrice] = useState();
  const [totalLiquidity, setTotalLiquidity] = useState();
  const [martetCap, setMarketCap] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tvl, setTvl] = useState(0);
  const [totalTokenStaked, setTotalTokenStaked] = useState(0);
  const [totalLPStaked, setTotalLPStaked] = useState(0);
  const [stakeTokenPercent, setStakedTokenPercent] = useState(0);
  const [stakeLPPercent, setStakedLPPercent] = useState(0);
  const chainId = useChainId();

  const { data: totalSupply } = useContractRead({
    enabled: true,
    address: JustusTokenAddrBNB,
    abi: tokenABI,
    functionName: "totalSupply",
    onSuccess() {
      setMarketCap(
        ethers.utils.formatEther(totalSupply) * parseFloat(tokenPrice)
      );
      console.log(martetCap);
    },
  });

  const { data: totalStakedBalance } = useContractRead({
    enabled: true,
    address: JustusStakingContractAddr,
    abi: StakingContractABI,
    functionName: "totalSupply",
    onSuccess() {
      setTotalTokenStaked(totalStakedBalance);
    },
  });

  const { data: lockedTokenAmount } = useContractRead({
    enabled: true,
    address: JustusTokenAddr,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [LPTokenAddr],
    onSuccess() {
      setTvl(
        (ethers.utils.formatEther(lockedTokenAmount) +
          ethers.utils.formatEther(totalTokenStaked)) *
          parseFloat(tokenPrice)
      );
    },
  });

  const { data: supplyOfJustus } = useContractRead({
    enabled: true,
    address: JustusTokenAddr,
    abi: tokenABI,
    functionName: "totalSupply",
    onSuccess() {
      console.log(totalStakedBalance);
      console.log(supplyOfJustus);
      const stakingPercent =
        (ethers.utils.formatEther(totalStakedBalance) /
          ethers.utils.formatEther(supplyOfJustus)) *
        100;
      console.log(stakingPercent);
      setStakedTokenPercent(stakingPercent);
    },
  });

  const { data: totalLPSupply } = useContractRead({
    enabled: true,
    address: LPTokenAddr,
    abi: tokenABI,
    functionName: "totalSupply",
  });

  const { data: totalStakedLPBalance } = useContractRead({
    enabled: true,
    address: LPStakingContractAddr,
    abi: StakingContractABI,
    functionName: "totalSupply",
    onSuccess() {
      setTotalLPStaked(totalStakedLPBalance);
    },
  });

  // const { data: lockedTokenAmount } = useContractRead({
  //   enabled: true,
  //   address: JustusTokenAddr,
  //   abi: tokenABI,
  //   functionName: "balanceOf",
  //   args: [pairAddr],
  //   onSuccess() {
  //     setTvl(
  //       (ethers.utils.formatEther(lockedTokenAmount) +
  //         ethers.utils.formatEther(totalTokenStaked)) *
  //         parseFloat(tokenPrice)
  //     );
  //   },
  // });

  const { data: supplyOfLP } = useContractRead({
    enabled: true,
    address: LPTokenAddr,
    abi: tokenABI,
    functionName: "totalSupply",
    onSuccess() {
      const stakingPercent =
        (ethers.utils.formatEther(totalStakedLPBalance) /
          ethers.utils.formatEther(supplyOfLP)) *
        100;
      setStakedLPPercent(stakingPercent);
    },
  });

  useEffect(() => {
    axios
      .get(
        "https://api.dexscreener.com/latest/dex/tokens/" + JustusTokenAddrBNB
      )
      .then((response) => {
        setTokenPrice(response.data.pairs[0].priceUsd);
        setTotalLiquidity(response.data.pairs[0].liquidity.usd);
      });
    setIsLoading(false);
  }, [chainId]);

  console.log("staked token percent: ", stakeTokenPercent);
  return (
    <div className="p-5">
      <p className="text-xl mb-5 font-semibold">Dashboard</p>
      <div className="grid auto-cols-fr sm:grid-cols-3">
        <StakedAmountCard
          icon={IconTotalLiquidity}
          classNames={"bg-[#b34fff] mb-0 sm:mb-5"}
          text="Total Liquidity"
          isFormated={true}
          balance={totalLiquidity}
          loading={isLoading}
        />
        <StakedAmountCard
          icon={IconMarketCap}
          classNames={"bg-[#a7c16b] mb-0 sm:mb-5"}
          text="Fully Diluted Market Cap"
          balance={martetCap}
          isFormated={true}
          loading={isLoading}
        />
        <StakedAmountCard
          icon={IconTotalTokensTVL}
          classNames={"bg-[#405ef6]"}
          text="Total Tokens TVL"
          balance={tvl}
          loading={isLoading}
          isFormated={true}
        />
      </div>
      <ChartComponent />
      <div className="flex flex-col md:flex-row  gap-3">
        <div className="native-stake w-[100%] md:w-[50%] text-sm">
          <div className="bg-[#376eab] w-[100%] text-center p-8 mb-3 rounded-xl font-semibold">
            Justus Tokens
          </div>
          <div className="flex flex-row mt-3 gap-3">
            <StakedAmountCard
              icon={IconTotalStakedToken}
              text={"Total Justus Token Staked"}
              balance={totalTokenStaked}
              loading={isLoading}
            />
            <StakedAmountCard
              icon={IconTotalStakePercent}
              text={"Total % of Justus Tokens Staked"}
              balance={stakeTokenPercent}
              loading={isLoading}
              isCurrency={false}
              isFormated={true}
            />
          </div>
          <div className="flex flex-row mt-3 gap-3">
            <StakedAmountCard
              icon={IconBNBJustusPrice}
              text={"Token Price"}
              balance={tokenPrice}
              classNames="mb-1"
              isFormated={true}
            />
            <StakedAmountCard
              icon={IconTotalJustusTVL}
              text={"Total Justus Tokens TVL"}
              balance={tvl}
              classNames="mb-1"
              loading={isLoading}
              isFormated={true}
            />
          </div>
        </div>
        <div className="native-stake w-[100%] md:w-[50%] text-sm flex flex-col">
          <div className="bg-[#376eab] w-[100%] text-center p-8 mb-2 rounded-xl font-semibold">
            LP Tokens
          </div>
          <div className="flex flex-row gap-3 flex-1">
            <StakedAmountCard
              icon={IconTotalLPStake}
              text={"Total LP Tokens Staked"}
              balance={totalStakedLPBalance}
              classNames="mb-3 justify-center mt-3"
              loading={isLoading}
            />

            <StakedAmountCard
              icon={IconTotalStakePercent}
              text={"Total % of LP Tokens Staked"}
              balance={stakeLPPercent}
              loading={isLoading}
              classNames="mt-3"
              isFormated={true}
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-row mt-3 gap-3 flex-1">
              <StakedAmountCard
                icon={IconBNBJustusPrice}
                text={"ETH LP Token Price"}
                balance={0}
                loading={isLoading}
              />
              <StakedAmountCard
                icon={IconLPTVL}
                text={"Total LP Tokens TVL"}
                balance={0}
                classNames="mb-1 justify-center"
                loading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-[#376eab] w-[100%] p-5  rounded-xl mt-3">
        <div className="flex flex-row items-center  w-[100%] text-center">
          <div className="flex flex-row justify-center items-center w-[100%] text-center">
            <img src={IconTotalStakedToken} className="h-10 w-10" />
            <div className="pt-1 ml-2">
              <div className="text-xs py-0 flex flex-row items-center text-left gap-1">
                {"Total staking APY"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <StakedAmountCard
          icon={IconJustusStakeAPY}
          text={"Total  Stakers APY"}
          balance={0}
          classNames="mt-3 bg-[#405ef6]"
          loading={isLoading}
        />
        <StakedAmountCard
          icon={IconLPStakingAPY}
          text={"Total LP Stakers APY"}
          balance={0}
          classNames="mt-3 bg-[#b34fff]"
          loading={isLoading}
        />
      </div> */}
    </div>
  );
}
