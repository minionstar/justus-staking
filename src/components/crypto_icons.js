import React from "react";
import { Usdt, Usdc, Busd, Dai } from "react-web3-icons";
import JttIcon from "../assets/images/jtt-token.png";

export default function Icon(props) {
  const { symbol } = props;
  switch (symbol) {
    case "USDT":
      return <Usdt className="text-3xl" />;
    case "USDC":
      return <Usdc className="text-3xl" />;
    case "DAI":
      return <Dai className="text-3xl" />;
    case "BUSD":
      return <Busd className="text-3xl" />;
    case "MUSDT":
      return <Usdt className="text-3xl" />;
    case "MUSDC":
      return <Usdc className="text-3xl" />;
    case "JUT":
      return <img src={JttIcon} className="h-8" alt="Justus Token" />;
    case "JTT":
      return <img src={JttIcon} alt="Justus Token" />;
    default:
      break;
  }
}

// remove JUT case and Test tokens case
