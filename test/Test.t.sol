// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ZkFacilitatorManager} from "../contracts/ZKFacilitatorManager.sol";
import {BridgedGhoToken} from "../contracts/BridgedGHOToken.sol";

contract FullTest is Test {
    BridgedGhoToken public ghoToken;
    ZkFacilitatorManager public facilitatorManager;

    function setUp() public {
        facilitatorManager = new ZkFacilitatorManager();
        facilitatorManager.setNumber(0);
    }
}
