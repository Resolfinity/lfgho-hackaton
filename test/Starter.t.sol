pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../contracts/Starter.sol";
import "../circuits/contract/bucket_proof/plonk_vk.sol";

contract StarterTest is Test {
    Starter public starter;
    UltraVerifier public verifier;

    bytes32[] public correct;

    function setUp() public {
        verifier = new UltraVerifier();
        starter = new Starter(verifier);
    }

    function testVerifyProof() public {
        string memory proof = vm.readLine("./circuits/proofs/bucket_proof.proof");
        bytes memory proofBytes = vm.parseBytes(proof);

        bytes32 data = 0x37dfe42b45d3d8817c0f1a656abff71e3aa4e2c009ee185d925ea1a139054a6b;
        correct = new bytes32[](32);

        for (uint256 i = 0; i < 32; i++) {
            // Extract each byte and convert it to bytes32
            bytes32 temp = bytes32(uint256(uint8(data[i])));
            correct[i] = temp;
        }

        console.logBytes32(correct[0]);

        // bytes32[] memory correct = new bytes32[](32);
        // correct[0] = bytes32(0x37dfe42b45d3d8817c0f1a656abff71e3aa4e2c009ee185d925ea1a139054a6b);

        starter.verifyEqual(proofBytes, correct);
    }

    // function test_wrongProof() public {
    //     vm.expectRevert();
    //     string memory proof = vm.readLine("./bucket_proof/proofs/bucket_proof.proof");
    //     bytes memory proofBytes = vm.parseBytes(proof);
    //     starter.verifyEqual(proofBytes, wrong);
    // }

    // function test_dynamicProof() public {
    //     string[] memory _fieldNames = new string[](2);
    //     string[] memory _fieldValues = new string[](2);

    //     _fieldNames[0] = "x";
    //     _fieldNames[1] = "y";
    //     _fieldValues[0] = "5";
    //     _fieldValues[1] = "5";

    //     // Set expected dynamic proof outcome
    //     dynamicCorrect[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000005);
    //     bytes memory proofBytes = generateDynamicProof("test1"), _fieldNames, _fieldValues);
    //     starter.verifyEqual(proofBytes, dynamicCorrect);
    // }

    // function test_dynamicProofSecondTest() public {
    //     string[] memory _fieldNames = new string[](2);
    //     string[] memory _fieldValues = new string[](2);

    //     _fieldNames[0] = "x";
    //     _fieldNames[1] = "y";
    //     _fieldValues[0] = "8";
    //     _fieldValues[1] = "8";

    //     // Set expected dynamic proof outcome
    //     dynamicCorrect[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000008);
    //     bytes memory proofBytes = generateDynamicProof("test2"), _fieldNames, _fieldValues);
    //     starter.verifyEqual(proofBytes, dynamicCorrect);
    // }

    // function test_dynamicProofThirdTest() public {
    //     string[] memory _fieldNames = new string[](2);
    //     string[] memory _fieldValues = new string[](2);

    //     _fieldNames[0] = "x";
    //     _fieldNames[1] = "y";
    //     _fieldValues[0] = "7";
    //     _fieldValues[1] = "7";

    //     // Set expected dynamic proof outcome
    //     dynamicCorrect[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000007);
    //     bytes memory proofBytes = generateDynamicProof("test3"), _fieldNames, _fieldValues);
    //     starter.verifyEqual(proofBytes, dynamicCorrect);
    // }

    // /// @dev This function generates dynamic proofs using 2 scripts in the /script directory
    // ///
    // /// @param _testName a random string to identify the test by, this is used to create a unique folder name in the /tmp directory
    // /// @param _fields The field names within the Prover.toml file
    // /// @param _fieldValues The field values associated with fields names within the Prover.toml file
    // function generateDynamicProof(string memory _testName, string[] memory _fields, string[] memory _fieldValues)
    //     public
    //     returns (bytes memory)
    // {
    //     require(_fields.length == _fieldValues.length, "generateProof: Input arrays not the same length");

    //     // Copy files and create Prover.toml in /tmp directory
    //     string[] memory filecreateCommand = new string[](2);
    //     filecreateCommand[0] = "./script/createFile.sh";
    //     filecreateCommand[1] = _testName;
    //     bytes memory fileCreateResponse = vm.ffi(filecreateCommand);
    //     console.log(string(fileCreateResponse));

    //     string memory _file = string.concat("/tmp/"), _testName, "/Prover.toml");
    //     vm.writeFile(_file, "");
    //     for (uint256 i; i < _fields.length; i++) {
    //         vm.writeLine(_file, string.concat(_fields[i], " = "), _fieldValues[i]));
    //     }

    //     // now generate the proof by calling the script using ffi
    //     string[] memory ffi_command = new string[](2);
    //     ffi_command[0] = "./script/prove.sh";
    //     ffi_command[1] = _testName;
    //     bytes memory commandResponse = vm.ffi(ffi_command);
    //     console.log(string(commandResponse));
    //     string memory _newProof = vm.readLine(string.concat("/tmp/"), _testName, "/proofs/bucket_proof.proof"));
    //     return vm.parseBytes(_newProof);
    // }
}
