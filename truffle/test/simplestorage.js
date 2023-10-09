const LivretFamille = artifacts.require("LivretFamille");

contract('LivretFamille', () => {
  it('should read newly written values', async() => {
    const LivretFamilleInstance = await LivretFamille.deployed();
    var value = (await LivretFamilleInstance.read()).toNumber();

    assert.equal(value, 0, "0 wasn't the initial value");

    await LivretFamilleInstance.write(1);
    value = (await LivretFamilleInstance.read()).toNumber();
    assert.equal(value, 1, "1 was not written");

    await LivretFamilleInstance.write(2);
    value = (await LivretFamilleInstance.read()).toNumber();
    assert.equal(value, 2, "2 was not written");
  });
});
