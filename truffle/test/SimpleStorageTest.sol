// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../contracts/LivretFamille.sol";
// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract LivretFamilleTest {

  function testWriteValue() public {
    LivretFamille LivretFamille = LivretFamille(DeployedAddresses.LivretFamille());

    Assert.equal(LivretFamille.read(), 0, "Contract should have 0 stored");
    LivretFamille.write(1);
    Assert.equal(LivretFamille.read(), 1, "Contract should have 1 stored");
    LivretFamille.write(2);
    Assert.equal(LivretFamille.read(), 2, "Contract should have 2 stored");
  }
}
