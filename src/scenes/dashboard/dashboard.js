import React from "react";
import StakedAmountCard from "../stake/staked_amount_card";
import IconTotalStakedToken from "../../assets/images/icons/total-token-staked.png";
import ChartComponent from "../../components/chart";

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
    </div>
  );
}
