# HydroAI

This holds the code for the HydroAI SUI hackathon submission.

## Local setup

1. Clone repo
2. Use correct node version in `.nvmrc` or run `nvm use`
3. Install packages `npm install -g firebase-tools`

## Update website

1. Make edits under `./hosting`
2. run `cd ./hosting`
3. run `nvm use`
4. run `yarn`
5. run `yarn build`
6. run `cd ..`
7. run `nvm use`
8. Deploy hosting: `firebase deploy`
