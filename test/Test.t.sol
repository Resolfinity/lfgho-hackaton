// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {FacilitatorManager} from "../contracts/FacilitatorManager.sol";
import {GhoToken} from "../contracts/GHOToken.sol";

contract FullTest is Test {
    GhoToken public ghoToken;
    FacilitatorManager public facilitatorManager;

    function setUp() public {
        facilitatorManager = new FacilitatorManager();
        facilitatorManager.setNumber(0);
    }

    function test_Increment() public {
        facilitatorManager.increment();
        assertEq(facilitatorManager.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        facilitatorManager.setNumber(x);
        assertEq(facilitatorManager.number(), x);
    }
}
