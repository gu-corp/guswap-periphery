import { ethers } from 'hardhat'
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {
  const [deployer] = await ethers.getSigners()
  
  console.log('Start deploying...')
  const Factory = await ethers.getContractFactory('UniswapV2Router02', deployer)
  const contract = await Factory.deploy(process.env.UNISWAP_V2_FACTORY_CONTRACT_ADDRESS!, process.env.WETH_CONTRACT_ADDRESS!)

  await contract.waitForDeployment()
  console.log(`Deployer address: ${await deployer.getAddress()}`)
  console.log('Contract deployed at address:', contract.target)
  console.log('Contract deployed at block:', await ethers.provider.getBlockNumber())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
