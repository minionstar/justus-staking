import React from "react";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";

export default function PartnerModalBnb(props) {
  const { showModal, setShowModal } = props;
  return (
    <>
      {showModal ? (
        <div className="bg-[#231a4f]">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto sm:max-w-3xl flex flex-row justify-center">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-[#231a4f] outline-none focus:outline-none  w-[80%]">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">BNB</h3>
                  <span
                    className="bg-transparent text-4xl block outline-none focus:outline-none cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    {String.fromCharCode(215)}
                  </span>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-lg leading-relaxed">
                    Justus is an innovative blockchain platform aiming to
                    revolutionize decentralized finance. As part of its
                    introductory strategy, Justus has announced plans to
                    incentivize users by offering BNB, the native cryptocurrency
                    of the Binance ecosystem, for staking Justus tokens. This
                    approach is set to encourage early adoption and
                    participation within the Justus community, fostering a
                    vibrant and engaged user base. By providing users with the
                    opportunity to earn BNB through staking Justus tokens, the
                    platform aims to not only enhance its user base but also
                    promote the broader utility and value proposition of both
                    BNB and the Justus token within the growing landscape of
                    decentralized finance.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex flex-row items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <div className="flex flex-row gap-3 mb-5 text-2xl">
                    <a
                      href="https://www.youtube.com/@Justus-Token"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaSquareTwitter className="cursor-pointer" />
                    </a>
                    <a
                      href="https://justustoken.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGlobe className="cursor-pointer" />
                    </a>
                    <a
                      href="https://medium.com/@JustusToken"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaMedium className="cursor-pointer" />
                    </a>
                    <a
                      href="https://t.me/justustoken"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaTelegram className="cursor-pointer" />
                    </a>
                    <a
                      href="https://www.youtube.com/@Justus-Token"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaYoutube className="cursor-pointer" />
                    </a>
                    <a
                      href="https://discord.gg/justustoken"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaDiscord className="cursor-pointer" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
}
