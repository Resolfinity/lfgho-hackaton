// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.4;

interface IETHOracle {
    /**
     * @notice Checks if the eth mainnet storage root is stored in the contract
     * @param _ethStorageRoot - The storage root of the block
     * @return True if proof is valid, reverts otherwise
     */
    function checkBlockHash(bytes32 _ethStorageRoot) external view returns (bool);
}
