import React from "@heroicons/react";
import { showTokenBalance } from "../../utils";
import { Justus_DECIMAL } from "../../constants/decimal";
import { Spinner } from "@material-tailwind/react";
export default function StakedAmountCard(props) {
  const {
    icon,
    text,
    balance,
    classNames,
    loading,
    isFormated = false,
    isCurrency = true,
  } = props;
  return (
    <div
      className={
        "flex flex-col items-center bg-[#376eab] w-[100%] text-center p-8 mb-5 rounded-xl " +
        classNames
      }
    >
      <img src={icon} className={"h-10 w-10"} />
      <p className="py-5 text-xs">{text}</p>

      {loading || balance == 0 ? (
        <div className="h-6 w-12 image-thumbnail rounded-sm bg-secondary animate-pulse flex items-center justify-center"></div>
      ) : (
        <p className="text-lg">
          {isCurrency
            ? "$ " + showTokenBalance(balance, Justus_DECIMAL, isFormated)
            : showTokenBalance(balance, Justus_DECIMAL, isFormated) + " %"}
        </p>
      )}
    </div>
  );
}
