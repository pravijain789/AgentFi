// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AgentNFT is ERC721, Ownable {
    uint256 public nextTokenId;

    constructor() ERC721("AgentFi Alpha", "AGENT") Ownable(msg.sender) {}

    function mint() external {
        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
    }

    function totalSupply() external view returns (uint256) {
        return nextTokenId;
    }
}