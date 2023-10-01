import React from "react";
import StakedAmountCard from "../stake/staked_amount_card";
import IconTotalStakedToken from "../../assets/images/icons/total-token-staked.png";
import ChartComponent from "../../components/chart";
import IconBalanceJustusToken from "../../assets/images/icons/token-balance.png";
import IconUnstakeToken from "../../assets/images/icons//unstake-justus-token.png";
import IconEarnedRewardToken from "../../assets/images/icons/earned-justus-rewards.png";
import UnstakedRewardCard from "../stake/unstake_reward_card";

export default function Dashboard(props) {
  const { icon, balance, text } = props;
  return (
    <div className="p-5">
      <p className="text-xl mb-5 font-semibold">Dashboard</p>
      <div className="grid auto-cols-fr sm:grid-cols-3">
        <StakedAmountCard
          icon={IconTotalStakedToken}
          classNames={"bg-[#b34fff] mb-0 sm:mb-5"}
          text="Total Liquidity"
          balance="$356,763.91"
        />
        <StakedAmountCard
          icon={IconTotalStakedToken}
          classNames={"bg-[#a7c16b] mb-0 sm:mb-5"}
          text="Fully Diluted Market Cap"
          balance="$409,106.09"
        />
        <StakedAmountCard
          icon={IconTotalStakedToken}
          classNames={"bg-[#405ef6]"}
          text="Fully Diluted Market Cap"
          balance="$409,106.09"
        />
      </div>
      <ChartComponent />
      <div className="flex flex-col md:flex-row  gap-3">
        <div className="native-stake w-[100%] md:w-[50%] text-sm">
          <div className="bg-[#376eab] w-[100%] text-center p-8 mb-3 rounded-xl font-semibold">
            Justus Tokens
          </div>
          <div className="bg-[#376eab] w-[100%] p-5  rounded-xl mt-3">
            <div className="flex flex-row items-center  w-[100%] text-center">
              <div className="flex flex-row items-center w-[100%] text-center">
                <img src={IconTotalStakedToken} className="h-10 w-10" />
                <div className="pt-1 ml-2">
                  <div className="text-xs py-0 flex flex-row items-center text-left gap-1">
                    {"Total Sheesha Tokens TVL"}
                  </div>
                  <p className="text-xl text-start">{"$152,580.16"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-3 gap-3">
            <StakedAmountCard
              icon={IconTotalStakedToken}
              text={"Total Justus Tokens TVL"}
              balance={"$152,580.16"}
              classNames="mb-1"
            />
            <StakedAmountCard
              icon={IconBalanceJustusToken}
              text={"ETH Justus Token Balance"}
              balance={"$4.85"}
              classNames="mb-1"
            />
          </div>
          <div className="flex flex-row mt-3 gap-3">
            <StakedAmountCard
              icon={IconTotalStakedToken}
              text={"Justus Staking APY"}
              balance={"15.9%"}
            />
            <StakedAmountCard
              icon={IconBalanceJustusToken}
              text={"Total % of Justus Tokens Staked"}
              balance={"37.0%"}
            />
          </div>
        </div>
        <div className="native-stake w-[100%] md:w-[50%] text-sm flex flex-col">
          <div className="bg-[#376eab] w-[100%] text-center p-8 mb-2 rounded-xl font-semibold">
            LP Tokens
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-row mt-3 gap-3 flex-1">
              <StakedAmountCard
                icon={IconTotalStakedToken}
                text={"Total LP Tokens Staked"}
                balance={"2,595.14"}
                classNames="mb-1 justify-center"
              />
              <StakedAmountCard
                icon={IconBalanceJustusToken}
                text={"Total LP Tokens TVL"}
                balance={"$357,269.56"}
                classNames="mb-1 justify-center"
              />
            </div>
            <div className="flex flex-row gap-3 flex-1">
              <StakedAmountCard
                icon={IconTotalStakedToken}
                text={"ETH LP Token Price"}
                balance={"$137.67"}
                classNames="mt-3"
              />
              <StakedAmountCard
                icon={IconBalanceJustusToken}
                text={"LP Staking APY"}
                balance={"13.6%"}
                classNames="mt-3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#376eab] w-[100%] p-5  rounded-xl mt-3">
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
          icon={IconTotalStakedToken}
          text={"Total SHEESHA Stakers APY"}
          balance={"$137.67"}
          classNames="mt-3 bg-[#405ef6]"
        />
        <StakedAmountCard
          icon={IconBalanceJustusToken}
          text={"Total LP Stakers APY"}
          balance={"13.6%"}
          classNames="mt-3 bg-[#b34fff]"
        />
      </div>
    </div>
  );
}
