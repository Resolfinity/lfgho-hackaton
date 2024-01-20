// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../contracts/TestContract.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        TestContract tc = new TestContract();

        vm.stopBroadcast();

        console.logAddress(address(tc));
    }
}
