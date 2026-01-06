// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/AgentNFT.sol";
import "../src/AgentAccount.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        AgentNFT nft = new AgentNFT();
        console.log("AgentNFT Deployed at:", address(nft));

        AgentAccount implementation = new AgentAccount();
        console.log("Account Implementation Deployed at:", address(implementation));

        vm.stopBroadcast();
    }
}