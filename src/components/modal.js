import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { FaReddit } from "react-icons/fa6";

export default function PartnerModal(props) {
  const { showModal, setShowModal } = props;
  return (
    <>
      {showModal ? (
        <div className="bg-[#231a4f]">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto sm:max-w-5xl flex flex-row justify-center">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#231a4f] outline-none focus:outline-none  w-[80%]">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Tera Block</h3>
                  <span
                    className="bg-transparent text-4xl block outline-none focus:outline-none cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </span>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-lg leading-relaxed">
                    Terablock is a trade automation exchange for cryptocurrency
                    portfolio management that personalizes each user’s
                    experience through machine learning. Their goal is to
                    provide resources for new users to make hard decisions
                    easily when it comes to trading cryptocurrencies. At
                    TeraBlock, investors will be able to purchase cryptocurrency
                    with any card from a bank and manage their assets with trade
                    automation. TeraBlock is essentially an exchange in its
                    simplest form, providing investors the resources they need
                    to trade and invest without hesitation.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex flex-row items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <div className="flex flex-row gap-3 mb-5 text-2xl">
                    <FaLinkedin className="cursor-pointer" />

                    <FaSquareTwitter className="cursor-pointer" />

                    <FaGlobe className="cursor-pointer" />

                    <FaMedium className="cursor-pointer" />

                    <FaTelegram className="cursor-pointer" />

                    <FaYoutube className="cursor-pointer" />

                    <FaDiscord className="cursor-pointer" />

                    <FaReddit className="cursor-pointer" />
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
