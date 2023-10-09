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

contract LivretFamille  {
    string public nom;
    Personne[] public membres;
    
    constructor(string memory _nom){
        nom = _nom;
    }

    function addMember(string memory prenom, string memory date_naissance, Role role) public {
        membres.push(Personne(prenom, date_naissance, role));
    }

    function deleteMember(uint index) public {
        require(index < membres.length, "Index out of bounds");
        delete membres[index];
    }

    function getMembers() public view returns(Personne[] memory) {
        return membres;
    }
}