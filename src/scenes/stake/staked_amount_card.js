import React from "@heroicons/react";
import { showTokenBalance } from "../../utils";
import { JTT_DECIMAL } from "../../constants/decimal";
export default function StakedAmountCard(props) {
  const {
    icon,
    text,
    balance = 0,
    classNames,
    loading,
    isFormated = false,
    isCurrency = true,
    isJtt = false,
    isLP = false,
    isPrice = false,
  } = props;
  return (
    <div
      className={
        "flex flex-col items-center bg-[#376eab] w-[100%] text-center p-8 mb-3 rounded-xl " +
        classNames
      }
    >
      <img src={icon} className={"h-10 w-10"} alt="icon" />
      <p className="py-5 text-xs">{text}</p>

      {loading ? (
        <div className="h-6 w-12 image-thumbnail rounded-sm bg-secondary animate-pulse flex items-center justify-center"></div>
      ) : (
        <p className="text-lg">
          {isCurrency
            ? isJtt
              ? showTokenBalance(balance, JTT_DECIMAL, isFormated) + " JTT"
              : "$ " +
                (isPrice
                  ? balance
                  : showTokenBalance(balance, JTT_DECIMAL, isFormated))
            : isLP
            ? showTokenBalance(balance, JTT_DECIMAL, isFormated) + " JTT/BNB"
            : showTokenBalance(balance, JTT_DECIMAL, isFormated) + " %"}
        </p>
      )}
    </div>
  );
}
