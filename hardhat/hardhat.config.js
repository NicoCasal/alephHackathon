require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.21",
  networks: {
    fuji: {
      url: process.env.AVALANCHE_RCP,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
