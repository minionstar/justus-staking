import React from "react";
import axios from "axios";
export const getTokenInfo = (tokenAddr) =>
  axios
    .get(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddr}`)
    .then((response) => {
      return response.data;
    });
