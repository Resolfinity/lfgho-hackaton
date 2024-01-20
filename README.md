# ZK GHO Facilitator by Resolfinity
### L2 Flashminter following AAVE Governance limitation from the Mainnet ###
![Zk-gho-facilitator](https://github.com/Resolfinity/lfgho-hackaton/blob/main/docs/ZK-GHO-Facilitator_logo_512x512.png)

## Demo for LFGHO hackaton

### Description ###

The Zk Gho Facilitator is our vision of how the GHO Flash Minter on any L2 can work in its original form.

Now, Flash Loans on the Mainnet have a global limitation managed by the AAVE Governance.

The main idea here is to:

- create a zk storage proof of the limitation value from the Mainnet smart contract
- pass it to any desired L2
- verify zk proof against the Mainnet block header.

[LFGHO Project page](https://ethglobal.com/showcase/gho-zk-facilitator-x9rdg)

## How to run

Foundry, Node.js, Npm should be installed.

```
git clone git@github.com:Resolfinity/lfgho-hackaton.git

yarn

yarn forge-build

yarn typechain

```

Copy .env.example to .env and fill in all the vars.

To run relay locally:

set MAINNET_NODE_URI=http://127.0.0.1:8545 in .env
set ALCHEMY_NODE_URI in 'anvil' field of package.json 'scripts' section

```
yarn anvil
yarn dev
```

relay will be run

to impersonately change mainnet flashminter cap to the new value, in new terminal run

```
yarn change-cap
```

in the first terminal you will see logs:

- cap change detected
- storage proof of new value retrieved from gho contract
- zk proof of new value built
- zk proof sent to the mumbai verificator
- proof verified and zk facilitator manager set up new flashminter cap in the wrapped gho contract
