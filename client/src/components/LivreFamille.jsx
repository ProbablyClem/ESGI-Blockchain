import { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";

function LivretFamille() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [role, setRole] = useState(0);
  const [membres, setMembres] = useState([]);
  const [indexToDelete, setIndexToDelete] = useState("");
  const [prenomToSearch, setPrenomToSearch] = useState("");
  const [seachResult, setSearchResult] = useState({});

  const getRoleName = (role) => {
    switch (role) {
      case "0":
        return "Parent 1";
      case "1":
        return "Parent 2";
      case "2":
        return "Enfant";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    const getList = async () => {
      const value = await contract?.methods
        .getMembers()
        .call({ from: accounts[0] });
      setMembres([]);
      value.forEach((membre) => {
        let m = {
          prenom: membre.prenom,
          date_naissance: membre.date_naissance,
          roleName: getRoleName(membre.role),
        };
        setMembres((membres) => [...membres, m]);
      });
      console.log(membres);
    };
    getList();

    contract?.events.addMemberEvent({ fromBlock: 0 }, (error, event) => {
      if (!error) {
        console.log(event.returnValues._from, event.returnValues._value);
        getList();
      }
    });
    contract?.events.deleteMemberEvent({ fromBlock: 0 }, (error, event) => {
      if (!error) {
        console.log(event.returnValues._from, event.returnValues._value);
        getList();
      }
    });
  }, [contract, accounts]);

  const addMember = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (prenom === "") {
      alert("Please enter a prenom.");
      return;
    }
    if (dateNaissance === "") {
      alert("Please enter a date de naissance.");
      return;
    }
    if (role == null) {
      alert("Please select a role.");
      return;
    }
    console.log(prenom, dateNaissance, role);
    await contract.methods
      .addMember(prenom, dateNaissance, role)
      .send({ from: accounts[0] });
  };

  const deleteMember = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (indexToDelete === "") {
      alert("Please enter an index.");
      return;
    }
    let index = parseInt(indexToDelete);
    await contract.methods.deleteMember(index).send({ from: accounts[0] });
  };

  const searchMember = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (prenomToSearch === "") {
      alert("Please enter a prenom.");
      return;
    }
    const value = await contract.methods
      .getMemberByPrenom(prenomToSearch)
      .call({ from: accounts[0] });
    if (value.prenom === "") {
      alert("Aucun membres trouvé pour le prénom " + prenomToSearch);
      return;
    }
    setSearchResult({
      prenom: value.prenom,
      date_naissance: value.date_naissance,
      roleName: getRoleName(value.role),
    });
  };

  return (
    <div className="btns">
      <h2>Membres</h2>
      <ul>
        {membres.map((membre, index) =>
          membre.prenom === "" ? null : (
            <li key={index}>
              {index} - Prénom : {membre.prenom}, Né le {membre.date_naissance},{" "}
              {membre.roleName}
            </li>
          )
        )}
      </ul>
      <hr></hr>
      <h2>Ajouter un membre</h2>
      <div>
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date de naissance"
          value={dateNaissance}
          onChange={(e) => setDateNaissance(e.target.value)}
        />
        <label htmlFor="role-select">Choissisez un role: </label>
        <select
          name="role"
          id="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="0">Parent 1</option>
          <option value="1">Parent 2</option>
          <option value="2">Enfant</option>
        </select>
        <button type="button" onClick={addMember}>
          Créer
        </button>
      </div>
      <hr></hr>
      <h2>Supprimer un membre</h2>
      <div>
        <input
          type="text"
          placeholder="index"
          value={indexToDelete}
          onChange={(e) => setIndexToDelete(e.target.value)}
        />
        <button type="button" onClick={deleteMember}>
          Supprimer
        </button>
      </div>
      <hr></hr>
      <h2>Rechercher un membre</h2>
      <div>
        <input
          type="text"
          placeholder="prénom"
          value={prenomToSearch}
          onChange={(e) => setPrenomToSearch(e.target.value)}
        />
        <button type="button" onClick={searchMember}>
          Rechercher
        </button>
      </div>
      <div>
        {seachResult.prenom === undefined ? null : (
          <div>
            Prénom : {seachResult.prenom}, Né le {seachResult.date_naissance},{" "}
            {seachResult.roleName}
          </div>
        )}
      </div>
    </div>
  );
}

export default LivretFamille;
