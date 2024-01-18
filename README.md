# ZK GHO Facilitator by Resolfinity

## Demo for LFGHO hackaton

todo: Add description and diagrams

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
