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

export const showDateFormatted = (value) => {
  const time = ethers.utils.formatUnits(value.toString(), 0);
  if (time === 0) {
    return "Finished";
  }
  const timeInSeconds = Math.floor(time * 1000);
  const date = new Date(timeInSeconds);
  const dateFormatted = `${date.getFullYear()}${"/"}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${"/"}${date.getDate().toString().padStart(2, "0")}`;
  return dateFormatted;
};
