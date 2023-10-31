import React, { useState } from "react";
import IconTotalStakedToken from "../../assets/images/icons/total-token-staked.png";
import StakedAmountCard from "./staked_amount_card";
import IconBalanceJustusToken from "../../assets/images/icons/token-balance.png";
import UnstakedRewardCard from "./unstake_reward_card";
import IconUnstakeToken from "../../assets/images/icons/unstake-justus-token.png";
import {
  showTokenBalance,
  getFormatedBalance,
  getETHBalance,
} from "../../utils";
import { JTT_DECIMAL } from "../../constants/decimal";
import {
  LPStakingContractAddr,
  LPTokenAddr,
  RewardTokenAddr,
} from "../../constants/address";
import { StakingContractABI, tokenABI } from "../../constants/abis";
import {
  useContractRead,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import SweetAlert2 from "react-sweetalert2";

export default function LPStake(props) {
  const { address } = useAccount();
  const [amountToStake, setAmountToStake] = useState();
  const [unstakeAmount, setUnStakeAmount] = useState();
  const [isErr, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { data: totalStakedBalance, isLoading: isLoadingTotalStakedBalance } =
    useContractRead({
      enabled: true,
      address: LPStakingContractAddr,
      abi: StakingContractABI,
      functionName: "totalSupply",
      watch: true,
    });

  const { data: lpBalance, isLoadingUserBalance } = useContractRead({
    enabled: true,
    address: LPTokenAddr,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const { data: userStakedBalance, isLoading: isLoadingUserStakedBalance } =
    useContractRead({
      enabled: true,
      address: LPStakingContractAddr,
      abi: StakingContractABI,
      functionName: "balanceOf",
      args: [address],
      watch: true,
    });

  /* approve Justus token to stake */
  const { data: approveDate, write: approveToken } = useContractWrite({
    address: LPTokenAddr,
    abi: tokenABI,
    functionName: "approve",
    args: [LPStakingContractAddr, getFormatedBalance(amountToStake)],
  });

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approveDate?.hash,
    onSuccess() {
      stakeToken();
    },
  });

  /* stake */
  const { data: stakeData, write: stakeToken } = useContractWrite({
    address: LPStakingContractAddr,
    abi: StakingContractABI,
    functionName: "stake",
    args: [getFormatedBalance(amountToStake)],
    onError: (error) => {
      setIsError(true);
      const message = error.walk().message.split(":")[1].split("Version")[0];
      setErrorMessage(message);
    },
  });

  const { isLoading: isStaking, isSuccess: isStakingSuccess } =
    useWaitForTransaction({
      hash: stakeData?.hash,
    });

  /* claim rewards. */
  const { data: claimData, write: claimReward } = useContractWrite({
    address: LPStakingContractAddr,
    abi: StakingContractABI,
    functionName: "getReward",
  });

  const { isLoading: isClaiming, isSuccess: isClaimingSuccess } =
    useWaitForTransaction({
      hash: claimData?.hash,
    });

  /* unstake tokens. */

  const { data: unstakeData, write: unstake } = useContractWrite({
    address: LPStakingContractAddr,
    abi: StakingContractABI,
    functionName: "withdraw",
    args: [getFormatedBalance(unstakeAmount)],
    onError: (error) => {
      setIsError(true);
      const message = error.walk().message.split(":")[1].split("Version")[0];
      setErrorMessage(message);
    },
  });

  const { isLoading: isWithdrawing, isSuccess: isWithdrawSuccess } =
    useWaitForTransaction({
      hash: unstakeData?.hash,
    });

  return (
    <div className="native-stake w-[100%] md:w-[50%] text-sm">
      <div className="bg-[#376eab] w-[100%] text-center p-8 mb-2 rounded-xl font-semibold">
        LP STAKE
      </div>
      <div className="bg-[#376eab] w-[100%] p-5  rounded-xl mt-3">
        <div className="flex flex-row justify-between">
          <div>
            <span className="mr-2 text-xs">Stake LP</span>
            <span
              className="ml-2 cursor-pointer"
              onClick={() => setAmountToStake(getETHBalance(lpBalance))}
            >
              Max
            </span>
          </div>
          <a
            className="ml-2 cursor-pointer right"
            href="https://pancakeswap.finance/v2/add/BNB/0xcdB3D3642FB4d48D2B5E4fb4a014448A2761C063"
            target="blank"
          >
            Add-LP
          </a>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <input
            type="number"
            id="lp-amount"
            className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full text-boxdark"
            placeholder="0"
            required
            value={amountToStake}
            onChange={(e) => setAmountToStake(e.target.value)}
          />
          <button
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
            onClick={() => approveToken()}
          >
            Stake
          </button>
        </div>
      </div>
      <div className="flex flex-row mt-3 gap-3">
        <StakedAmountCard
          loading={isLoadingTotalStakedBalance}
          icon={IconTotalStakedToken}
          text={"Total Staked LP"}
          balance={totalStakedBalance}
          isCurrency={false}
          isJtt={false}
          isLP={true}
        />
        <StakedAmountCard
          loading={isLoadingUserBalance}
          icon={IconBalanceJustusToken}
          text={"Your LP Balance"}
          balance={lpBalance}
        />
      </div>
      <div className="bg-[#376eab]  p-5 mb-5 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center  w-[100%] text-center mb-3 ">
          <div className="flex flex-row items-center w-[100%] text-center ">
            <img src={IconUnstakeToken} className="h-10 w-10" alt="Justus" />
            <div className="pt-1 ml-2">
              <div className="text-xs py-0 flex flex-row items-center text-left gap-1">
                {"Your Staking Balance"}
                {/* <TooltipComponent
                  content={
                    "Tax reduces by 4% monthly until month 24 onwards where it will be fixed at 4%. Starting tax for the first month is 96 %"
                  }
                /> */}
              </div>
              {isLoadingUserStakedBalance ? (
                <div className="h-6 w-12 image-thumbnail rounded-sm bg-secondary animate-pulse flex items-center justify-center"></div>
              ) : (
                <p className="text-lg text-start">
                  {showTokenBalance(userStakedBalance, JTT_DECIMAL)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row w-[100%] justify-between mt-3 sm:mt-1">
            <div className="relative w-full">
              <input
                type="number"
                className="block w-full p-3 pl-3 text-sm text-boxdark border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.0"
                required
                onChange={(e) => setUnStakeAmount(e.target.value)}
                value={unstakeAmount}
              />
              <span
                className="absolute bottom-2.5 text-sm py-1 cursor-pointer text-blue-500 right-8"
                onClick={() =>
                  setUnStakeAmount(
                    getETHBalance(userStakedBalance, JTT_DECIMAL)
                  )
                }
              >
                Max
              </span>
            </div>
            <button
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
              onClick={() => unstake()}
            >
              Unstake
            </button>
          </div>
        </div>
        <div className="flex flex-row w-[100%] justify-between">
          <span className="text-lg">Your Rewards</span>
          <button
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
            onClick={() => claimReward()}
          >
            Claim Rewards
          </button>
        </div>
        {RewardTokenAddr.map((rewardTokenAddr, index) => (
          <UnstakedRewardCard
            account={address}
            rewardTokenAddr={rewardTokenAddr}
            StakingContractAddr={LPStakingContractAddr}
            index={index}
          />
        ))}
      </div>
      {/* alerts for approve */}
      <SweetAlert2
        show={isApproving}
        showLoading={true}
        title={"Approving..."}
        text={"Don't refresh the browser!"}
        allowOutsideClick={false}
      />
      {/* alerts for stake */}
      <SweetAlert2
        show={isStaking}
        showLoading={true}
        title={"Staking..."}
        text={"Don't refresh the browser!"}
        allowOutsideClick={false}
      />
      <SweetAlert2
        icon={"success"}
        show={isStakingSuccess}
        text={"Stake Success!"}
        allowOutsideClick={false}
      />
      {/* alerts for claim */}
      <SweetAlert2
        show={isClaiming}
        showLoading={true}
        title={"Claiming..."}
        text={"Don't refresh the browser!"}
        allowOutsideClick={false}
      />
      <SweetAlert2
        icon={"success"}
        show={isClaimingSuccess}
        text={"Claim Success!"}
        allowOutsideClick={false}
      />
      {/* alerts for withdraw */}
      <SweetAlert2
        show={isWithdrawing}
        showLoading={true}
        title={"Withdrawing..."}
        text={"Don't refresh the browser!"}
        allowOutsideClick={false}
      />
      <SweetAlert2
        icon={"success"}
        show={isWithdrawSuccess}
        text={"Withdraw Success!"}
        allowOutsideClick={false}
      />
      <SweetAlert2
        icon={"error"}
        show={isErr}
        text={errorMessage}
        allowOutsideClick={false}
      />
    </div>
  );
}
