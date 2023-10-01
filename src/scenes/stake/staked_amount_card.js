import React from "@heroicons/react";

export default function StakedAmountCard(props) {
const {icon, text, balance, classNames} =  props;
  return (
    <div className={"flex flex-col items-center bg-[#376eab] w-[100%] text-center p-8 mb-5 rounded-xl " + classNames}>
      <img src={icon} className="h-10 w-10" />
      <p className="py-5 text-xs">{text}</p>
      <p className="text-xl">{balance}</p>
    </div>
  );
}
