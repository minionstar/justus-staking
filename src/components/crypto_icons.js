import React from "react";
import { Usdt, Usdc, Busd, Dai } from "react-web3-icons";

export default function Icon(props) {
  const { symbol } = props;
  switch (symbol) {
    case "USDT":
      return <Usdt className="text-3xl" />;
      break;
    case "USDC":
      return <Usdc className="text-3xl" />;
      break;
    case "DAI":
      return <Dai className="text-3xl" />;
      break;
    case "BUSD":
      return <Busd className="text-3xl" />;
      break;
    case "MUSDT":
      return <Usdt className="text-3xl" />;
      break;
    case "MUSDC":
      return <Usdc className="text-3xl" />;
      break;
    default:
      break;
  }
}
