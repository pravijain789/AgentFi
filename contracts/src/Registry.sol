// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Create2.sol";

contract Registry {
    event AccountCreated(
        address indexed account,
        address indexed implementation,
        uint256 chainId,
        address indexed tokenContract,
        uint256 tokenId,
        uint256 salt
    );

    function createAccount(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt,
        bytes calldata initData
    ) external returns (address) {
        // 1. Calculate the Code
        bytes memory code = _creationCode(implementation, chainId, tokenContract, tokenId, salt);
        
        // 2. Calculate the Address (Deterministic)
        address _account = Create2.computeAddress(bytes32(salt), keccak256(code));

        // 3. Check if already deployed
        if (_account.code.length != 0) return _account;

        // 4. Deploy
        emit AccountCreated(_account, implementation, chainId, tokenContract, tokenId, salt);
        _account = Create2.deploy(0, bytes32(salt), code);

        // 5. Initialize if needed
        if (initData.length != 0) {
            (bool success, ) = _account.call(initData);
            require(success, "Initialization failed");
        }

        return _account;
    }

    function account(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt
    ) external view returns (address) {
        bytes32 bytecodeHash = keccak256(
            _creationCode(implementation, chainId, tokenContract, tokenId, salt)
        );
        return Create2.computeAddress(bytes32(salt), bytecodeHash);
    }

    function _creationCode(
        address implementation_,
        uint256 chainId_,
        address tokenContract_,
        uint256 tokenId_,
        uint256 salt_
    ) internal pure returns (bytes memory) {
        // This is the Magic Glue.
        // It creates a "Proxy" that points to your AgentAccount.
        // It appends the ChainID, Contract, and TokenID to the footer so your Agent can read them.
        return abi.encodePacked(
            hex"3d60ad80600a3d3981f3363d3d373d3d3d363d73",
            implementation_,
            hex"5af43d82803e903d91602b57fd5bf3",
            abi.encode(chainId_, tokenContract_, tokenId_)
        );
    }
}