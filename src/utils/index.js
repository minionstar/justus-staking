import { ethers } from "ethers";

export const showTokenBalance = (balance, decimal, isFormated) => {
  return balance
    ? !isFormated
      ? new Intl.NumberFormat().format(
          ethers.utils.formatUnits(balance, decimal)
        )
      : new Intl.NumberFormat().format(balance)
    : 0;
};

export const getFormatedBalance = (balance, decimal) => {
  return balance ? ethers.utils.parseUnits(balance, decimal) : 0;
};

export const getETHBalance = (balance, decimal) => {
  return balance ? ethers.utils.formatUnits(balance, decimal) : 0;
};
