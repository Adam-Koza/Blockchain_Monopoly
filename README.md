# Blockchain Monopoly

Blockchain Monopoly is a dapp for playing Monopoly games!

Blockchain Monopoly utilizes the blockchain for verification and transparency, as well as utilizing a state channel to reduce the load on the blockchain network (Start and End of games are recorded on the blockchain and the state channel takes care of all games in progress).
  - Players can buy Monopoly Tokens through a smart contract to buy-into a game.
  - Players can create or join games.
  - Once a game starts all the moves are verified off-chain
  - All the game logic is handled on the server
  - When a game ends all the moves and game state history are hashed and published on-chain.
  - Players can view past game histories and view each move of a game. They can verify that the game or move happened as recorded on the blockchain throuh a merkle proof.
  - Players can view a leaderboard to showcase the best players and incentivize players to win.
  - Magic

### Deployed on the web

Blockchain Monopoly is deployed on heroku and can be found here:
[https://blockchain-monopoly.herokuapp.com/](https://blockchain-monopoly.herokuapp.com/)

### Technologies used

##### Front End
* ejs
* Bootstrap

##### Back End
* Node
* Express

##### Datastore
* MongoDB
* mlab
* Mongoose

##### Smart Contract
* Embark
* Ethersjs
* Deployed on the kovan testnet

##### Deployment
* Heroku
* [https://blockchain-monopoly.herokuapp.com/](https://blockchain-monopoly.herokuapp.com/)

### Installation from repo

Follow these steps to run the app locally.
Note that the database is running on the cloud [mlab](https://mlab.com/).

Blockchain Monopoly requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.
```sh
$ cd Blockchain_Monopoly
$ npm install
```

Start the server
```sh
$ npm run start
```

License
----

MIT


**Free Software, Hell Yeah!**
