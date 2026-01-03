// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

interface IERC6551Account {
    receive() external payable;
    function token() external view returns (uint256, address, uint256);
    function state() external view returns (uint256);
    function isValidSigner(address signer, bytes calldata context) external view returns (bytes4);
}

contract AgentAccount is IERC165, IERC1271, IERC6551Account {
    uint256 public state;
    mapping(address => bool) public executors;

    receive() external payable {}
    event ExecutorUpdated(address indexed executor, bool added);

    modifier onlyOwner() {
        require(msg.sender == _owner(), "Not token owner");
        _;
    }

    function execute(address to, uint256 value, bytes calldata data, uint8 operation)
        external
        payable
        returns (bytes memory result)
    {
        require(_isValidSigner(msg.sender), "Not authorized");
        ++state;
        bool success;
        (success, result) = to.call{value: value}(data);
        if (!success) {
            assembly {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
        }
    }

    function setExecutor(address _executor, bool _active) external onlyOwner {
        executors[_executor] = _active;
        emit ExecutorUpdated(_executor, _active);
    }

    function token() public view returns (uint256 chainId, address tokenContract, uint256 tokenId) {
        bytes memory footer = new bytes(0x60);
        assembly {
            extcodecopy(address(), add(footer, 0x20), 0x2d, 0x60)
        }
        return abi.decode(footer, (uint256, address, uint256));
    }

    function _owner() internal view returns (address) {
        (uint256 chainId, address tokenContract, uint256 tokenId) = token();
        if (chainId != block.chainid) return address(0);
        return IERC721(tokenContract).ownerOf(tokenId);
    }

    function _isValidSigner(address signer) internal view returns (bool) {
        return signer == _owner() || executors[signer];
    }

    // --- ADDED MISSING FUNCTION ---
    function isValidSigner(address signer, bytes calldata context) external view returns (bytes4) {
        if (_isValidSigner(signer)) {
            return IERC6551Account.isValidSigner.selector;
        }
        return bytes4(0);
    }

    function isValidSignature(bytes32 hash, bytes memory signature) external view returns (bytes4 magicValue) {
        bool isValid = SignatureChecker.isValidSignatureNow(_owner(), hash, signature);
        if (isValid) return IERC1271.isValidSignature.selector;
        return 0xffffffff;
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == type(IERC165).interfaceId || interfaceId == type(IERC6551Account).interfaceId;
    }
}