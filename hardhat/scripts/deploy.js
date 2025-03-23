async function main() {
    const NFCNFT = await ethers.getContractFactory("NFCNFT");
    const contract = await NFCNFT.deploy();
    await contract.deployed();
    console.log(`Contrato desplegado en: ${contract.address}`);
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  