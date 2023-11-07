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
  const [nom, setNom] = useState("");

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
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Membres</h2>
      <ul className="space-y-2">
        {membres.map((membre, index) =>
          membre.prenom === "" ? null : (
            <li
              key={index}
              className="bg-success p-3 rounded-md shadow-md flex items-center space-x-2 text-primary-content"
            >
              <span className="font-medium">
                {index + 1} - Prénom : {membre.prenom}, Né le{" "}
                {membre.date_naissance}, {membre.roleName}
              </span>
            </li>
          )
        )}
      </ul>
      <hr className="my-4" />
      <h2 className="text-3xl font-bold mb-4">Ajouter un membre</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-1/3 p-2 rounded-md shadow-md"
        />
        <input
          type="text"
          placeholder="Date de naissance"
          value={dateNaissance}
          onChange={(e) => setDateNaissance(e.target.value)}
          className="w-1/3 p-2 rounded-md shadow-md"
        />
        <label htmlFor="role-select" className="text-sm self-center">
          Choisissez un rôle :
        </label>
        <select
          name="role"
          id="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-1/4 p-2 rounded-md shadow-md"
        >
          <option value="0">Parent 1</option>
          <option value="1">Parent 2</option>
          <option value="2">Enfant</option>
        </select>
        <button
          type="button"
          onClick={addMember}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Créer
        </button>
      </div>
      <hr className="my-4" />
      <h2 className="text-3xl font-bold mb-4">Supprimer un membre</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Index"
          value={indexToDelete}
          onChange={(e) => setIndexToDelete(e.target.value)}
          className="w-3/4 p-2 rounded-md shadow-md"
        />
        <button
          type="button"
          onClick={deleteMember}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
        >
          Supprimer
        </button>
      </div>
      <hr className="my-4" />
      <h2 className="text-3xl font-bold mb-4">Rechercher un membre</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Prénom"
          value={prenomToSearch}
          onChange={(e) => setPrenomToSearch(e.target.value)}
          className="w-3/4 p-2 rounded-md shadow-md"
        />
        <button
          type="button"
          onClick={searchMember}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
        >
          Rechercher
        </button>
      </div>
      <div>
        {seachResult.prenom === undefined ? null : (
          <div className="bg-success text-primary-content p-3 rounded-md shadow-md mt-4">
            Prénom : {seachResult.prenom}, Né le {seachResult.date_naissance},{" "}
            {seachResult.roleName}
          </div>
        )}
      </div>
    </div>
  );
}

export default LivretFamille;
