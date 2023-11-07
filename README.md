# Livret de famille DAP

Deployed here : https://esgi-blockchain.vercel.app/
Clément Guiton, M2 Esgi AL

## Présentation

Cette appication permet de deployer un smart contract de livret de famille, qui contient chacun des membres et leur role dans la famille.

Le contrat est disponible ici : https://sepolia.etherscan.io/address/0xC2b13988813B9A0FEEaa5ABb47A82E2e267B5Ce6#code

## Deployer le smart contract

### Developpement

Pour deployer le smart contract en local, il faut lancer un noeud Ganache et deployer le smart contract avec truffle:

```
truffle migrate
```

### Sepolia

Pour deployer le smart contract sur Sepolia, il faut definir ces deux variables d'environnement :

- INFURA_API_KEY
- MNEMONIC

Pour cela, il faut creer un fichier .env à la racine du projet, et y mettre ces deux variables ou bien les mettre directement dans le terminal.

Puis deployer le smart contract avec truffle:

```
truffle migrate --network sepolia
```

## Lancer l'application

Pour lancer le frontend react, il faut modifier le copier le fichier truffle/build/LivretFamille.json dans le dossier client/src/contracts.
Puis lancer la commande suivante:

```
cd client
npm run start
```

## Avantages

Un smart contract permet de stocker des données de manière immutable, et de les rendre accessibles à tous. Cela permet de stocker des données de manière sécurisée et publique.

## Inconvénients

Comme dit précedement, les données stockées sur la blockchain sont publiques, il n'est donc pas possible de stocker des données sensibles ou privées sur la blockchain.
De plus le stockage de données sur la blockchain est couteux pour les utiliateurs finaux.
Enfin, la blockchain est lente, il est donc difficile de stocker des données volumineuses.
