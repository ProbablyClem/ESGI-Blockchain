// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

enum Role {
    Parent1,
    Parent2,
    Enfant
}

struct Personne {
    string prenom;
    string date_naissance;
    Role role;
}

contract LivretFamille {
    string public nom;
    Personne[] public membres;
    mapping(string => Personne) public membresByPrenom;

    constructor(string memory _nom) {
        nom = _nom;
    }

    event addMemberEvent(address indexed _from, Personne _value);

    function addMember(
        string calldata prenom,
        string calldata date_naissance,
        Role role
    ) public {
        Personne memory personne = Personne(prenom, date_naissance, role);
        membres.push(personne);
        membresByPrenom[prenom] = personne;
        emit addMemberEvent(msg.sender, personne);
    }

    modifier existMember(uint index) {
        require(index < membres.length, "Index out of bounds");
        _;
    }

    function deleteMember(uint index) public existMember(index) {
        Personne memory personne = membres[index];
        delete membresByPrenom[personne.prenom];
        delete membres[index];
        delete personne;
    }

    function getMembers() public view returns (Personne[] memory) {
        return membres;
    }

    function getMemberByPrenom(
        string calldata prenom
    ) public view returns (Personne memory) {
        return membresByPrenom[prenom];
    }
}
