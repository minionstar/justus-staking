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
import IconJustusStakeAPY from "../../assets/images/icons/IconJustusStakeAPY.png";
import IconLPStakingAPY from "../../assets/images/icons/IconLPStakingAPY.png";
import { ids } from "../../constants/ids";

import { useContractRead, useContractReads } from "wagmi";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import {
  JustusStakingContractAddr,
  JustusTokenAddr,
  JustusTokenAddrBNB,
  LPTokenAddr,
  LPStakingContractAddr,
  RewardTokenAddr,
} from "../../constants/address";
import { StakingContractABI, tokenABI } from "../../constants/abis";
import { Decimals } from "../../constants/decimal";

export default function Dashboard(props) {
  const [tokenPrice, setTokenPrice] = useState(0.0);
  const [lpPrice, setLPPrice] = useState();
  const [totalLiquidity, setTotalLiquidity] = useState();
  const [martetCap, setMarketCap] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tvl, setTvl] = useState(0);
  const [lpTvl, setLPTvl] = useState(0);
  const [totalTokenStaked, setTotalTokenStaked] = useState(0);
  const [stakeTokenPercent, setStakedTokenPercent] = useState(0);
  const [stakeLPPercent, setStakedLPPercent] = useState(0);
  const [jttAPY, setJTTAPY] = useState(0);
  const [lpAPY, setLPAPY] = useState(0);
  const [prices, setPrices] = useState([]);
  const YEAR = 60 * 60 * 24 * 365;

  useEffect(() => {
    axios
      .get(
        "https://api.dexscreener.com/latest/dex/tokens/" + JustusTokenAddrBNB
      )
      .then((response) => {
        setTotalLiquidity(response.data?.pairs[0].liquidity?.usd);
      });
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      )
      .then((response) => {
        setTokenPrice(response.data?.justus.usd.toFixed(5));
        setPrices(Object.values(response.data));
      });
    setIsLoading(false);
  }, []);

  const { data: totalSupply } = useContractRead({
    enabled: true,
    address: JustusTokenAddr,
    abi: tokenABI,
    functionName: "totalSupply",
    watch: true,
    onSuccess() {
      setMarketCap(
        ethers.utils.formatEther(totalSupply) * parseFloat(tokenPrice)
      );
    },
  });

  const { data: totalStakedBalance } = useContractRead({
    enabled: true,
    address: JustusStakingContractAddr,
    abi: StakingContractABI,
    functionName: "totalSupply",
    watch: true,
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
    watch: true,
    onSuccess() {
      setTvl(
        ethers.utils.formatEther(
          BigNumber.from(totalTokenStaked).add(
            BigNumber.from(lockedTokenAmount)
          )
        ) * parseFloat(tokenPrice)
      );
    },
  });

  const { data: supplyOfJustus } = useContractRead({
    enabled: true,
    address: JustusTokenAddr,
    abi: tokenABI,
    functionName: "totalSupply",
    watch: true,
    onSuccess() {
      const stakingPercent =
        (ethers.utils.formatEther(totalStakedBalance) /
          ethers.utils.formatEther(supplyOfJustus)) *
        100;
      setStakedTokenPercent(stakingPercent);
    },
  });

  const { data: totalLPSupply } = useContractRead({
    enabled: true,
    address: LPTokenAddr,
    abi: tokenABI,
    functionName: "totalSupply",
    watch: true,
    onSuccess() {
      const LPPrice = totalLiquidity / ethers.utils.formatEther(totalLPSupply);
      setLPPrice(LPPrice);
    },
  });

  const { data: totalStakedLPBalance } = useContractRead({
    enabled: true,
    address: LPStakingContractAddr,
    abi: StakingContractABI,
    functionName: "totalSupply",
    watch: true,
    onSuccess() {
      setLPTvl(
        ethers.utils.formatEther(totalStakedBalance) * parseFloat(lpPrice)
      );
    },
  });

  const { data: supplyOfLP } = useContractRead({
    enabled: true,
    address: LPTokenAddr,
    abi: tokenABI,
    functionName: "totalSupply",
    watch: true,
    onSuccess() {
      const stakingPercent =
        (ethers.utils.formatEther(totalStakedLPBalance) /
          ethers.utils.formatEther(supplyOfLP)) *
        100;
      setStakedLPPercent(stakingPercent);
    },
  });

  const { data: rewardDurations } = useContractReads({
    enabled: true,
    watch: true,
    contracts: RewardTokenAddr?.map((addr) => {
      return {
        address: JustusStakingContractAddr,
        abi: StakingContractABI,
        functionName: "rewardData",
        args: [addr],
      };
    }),
  });

  //get LP APY
  const { data: rewardTokensBalanceForLP } = useContractReads({
    enabled: true,
    contracts: RewardTokenAddr?.map((addr) => {
      return {
        address: addr,
        abi: tokenABI,
        functionName: "balanceOf",
        args: [LPStakingContractAddr],
      };
    }),
    onSuccess() {
      let totalLPAPY = 0;
      rewardTokensBalanceForLP?.map((rewardTokenBalance, index) => {
        const balance = ethers.utils.formatUnits(
          rewardTokenBalance.result,
          Decimals[index]
        );
        const r =
          ((balance * prices[index]?.usd) /
            (ethers.utils.formatEther(totalStakedLPBalance) *
              parseFloat(
                totalLiquidity / ethers.utils.formatEther(totalLPSupply)
              ))) *
          100;
        const rewardDuration = rewardDurationsForLP[index].result[1];
        if (rewardDuration) {
          const oneYear = ethers.utils.parseEther(YEAR.toString());
          const n = ethers.utils.formatEther(
            oneYear.div(ethers.BigNumber.from(rewardDuration))
          );
          totalLPAPY += r * n;
        }
        return r;
      });
      setLPAPY(Math.round(totalLPAPY));
    },
  });

  // get JTT APY

  const { data: rewardDurationsForLP } = useContractReads({
    enabled: true,
    watch: true,
    contracts: RewardTokenAddr?.map((addr) => {
      return {
        address: LPStakingContractAddr,
        abi: StakingContractABI,
        functionName: "rewardData",
        args: [addr],
      };
    }),
  });

  const { data: rewardTokensBalanceForJTT } = useContractReads({
    enabled: true,
    watch: true,
    contracts: RewardTokenAddr?.map((addr) => {
      return {
        address: addr,
        abi: tokenABI,
        functionName: "balanceOf",
        args: [JustusStakingContractAddr],
      };
    }),
    onSuccess() {
      let totalJTTAPY = 0;
      rewardTokensBalanceForJTT?.map((rewardTokenBalance, index) => {
        const balance = ethers.utils.formatUnits(
          rewardTokenBalance.result,
          Decimals[index]
        );

        const jttRate =
          ((balance * prices[index]?.usd) /
            (ethers.utils.formatEther(totalStakedBalance) *
              parseFloat(tokenPrice))) *
          100;
        const rewardDuration = rewardDurations[index].result[1];
        if (rewardDuration > 0) {
          const oneYear = ethers.utils.parseEther(YEAR.toString());
          const n = ethers.utils.formatEther(
            oneYear.div(ethers.BigNumber.from(rewardDuration))
          );
          totalJTTAPY += jttRate * n;
        }
        return jttRate;
      });
      setJTTAPY(Math.round(totalJTTAPY));
    },
  });

  return (
    <div className="p-5 pt-10">
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
          classNames={"bg-[#405ef6] mb-0 sm:mb-5"}
          text="Total Tokens TVL"
          balance={tvl}
          loading={isLoading}
          isFormated={true}
          isCurrency={true}
        />
      </div>
      <ChartComponent />
      <div className="flex flex-col md:flex-row  md:items-between gap-3">
        <div className="native-stake w-[100%] md:w-[50%] text-sm">
          <div className="bg-[#376eab] w-[100%] text-center p-8 rounded-xl font-semibold">
            Justus Tokens
          </div>
          <div className="flex flex-row mt-3 gap-3 flex-1">
            <StakedAmountCard
              icon={IconTotalStakedToken}
              text={"Total JTT Staked"}
              balance={totalTokenStaked}
              isJtt={true}
              loading={isLoading}
            />
            <StakedAmountCard
              icon={IconTotalStakePercent}
              text={"Total % of JTT Staked"}
              balance={stakeTokenPercent}
              loading={isLoading}
              isCurrency={false}
              isFormated={true}
            />
          </div>
          <div className="flex flex-row gap-3 ">
            <StakedAmountCard
              icon={IconBNBJustusPrice}
              text={"JTT Price"}
              balance={tokenPrice}
              classNames="mb-1"
              isFormated={true}
              isPrice={true}
            />
            <StakedAmountCard
              icon={IconTotalJustusTVL}
              text={"Total JTT TVL"}
              balance={tvl}
              classNames="mb-1"
              loading={isLoading}
              isFormated={true}
            />
          </div>
        </div>
        <div className="native-stake w-[100%] md:w-[50%] text-sm flex flex-col">
          <div className="bg-[#376eab] w-[100%] text-center p-8 rounded-xl font-semibold">
            LP Tokens
          </div>
          <div className="flex flex-row mt-3 gap-3 flex-1">
            <StakedAmountCard
              icon={IconTotalLPStake}
              text={"Total LP Staked"}
              balance={totalStakedLPBalance}
              classNames="justify-center"
              loading={isLoading}
              isCurrency={false}
              isJtt={false}
              isLP={true}
            />

            <StakedAmountCard
              icon={IconTotalStakePercent}
              text={"Total % of LP Staked"}
              balance={stakeLPPercent}
              loading={isLoading}
              classNames=""
              isFormated={true}
              isCurrency={false}
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-row gap-3 flex-1">
              <StakedAmountCard
                icon={IconBNBJustusPrice}
                text={"LP Price"}
                balance={lpPrice}
                loading={isLoading}
                isFormated={true}
              />
              <StakedAmountCard
                icon={IconLPTVL}
                text={"Total LP TVL"}
                balance={lpTvl}
                classNames="mb-1 justify-center"
                loading={isLoading}
                isFormated={true}
                isCurrency={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#376eab] w-[100%] p-5  rounded-xl mt-3">
        <div className="flex flex-row items-center  w-[100%] text-center">
          <div className="flex flex-row justify-center items-center w-[100%] text-center">
            <img
              src={IconTotalStakedToken}
              className="h-10 w-10"
              alt="total_staked_token"
            />
            <div className="pt-1 ml-2 font-semibold">
              <div className="text-xs py-0 flex flex-row items-center text-left gap-1">
                {"Staking APY"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <StakedAmountCard
          icon={IconJustusStakeAPY}
          text={"JTT Staking APY"}
          balance={jttAPY}
          classNames="mt-3 bg-[#405ef6]"
          loading={isLoading}
          isFormated={true}
          isCurrency={false}
        />
        <StakedAmountCard
          icon={IconLPStakingAPY}
          text={"LP Staking APY"}
          balance={lpAPY}
          classNames="mt-3 bg-[#b34fff]"
          loading={isLoading}
          isFormated={true}
          isCurrency={false}
        />
      </div>
    </div>
  );
}
