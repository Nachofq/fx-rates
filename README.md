## Objective

Build an API that allows:

- To create rates by obtaining FX rates from a given provider.
- To add a mark-up fee over the obtained FX rate
- To retrieve a list of these rates detailing:
  - Pair
  - Original rate
  - Fee %
  - Fee amount
  - Rate with mark-up fee applied

## Required global packages

Please install node and npm package manager. The easiest way is to get nvm and install the required node version, npm version will be automatically installed.

- installing nvm: https://github.com/nvm-sh/nvm
- node version: 16.14.0
- npm version: 8.3.1

## Local Environment

In order to run the project locally the following environment variables should be provided in a .env file located at project's root directory.
Also a running instance of mongodb is required.

- CHALLENGE_PORT = 3000
- CHALLENGE_HOST = localhost
- FIXER_API_URL = http://data.fixer.io/api
- FIXER_API_KEY = <FIXER_API_KEY>
- MONGODB_URL = mongodb://localhost:27017/
- MONGODB_OPTIONS = ""
- MONGODB_DATABASE = fx-rates

##### Production start

```sh
npm install
npm run build
npm run start

```

##### Development start

```sh
npm install
npm run dev
```

## Cloud Environment

A deployment of the last main branch commit is available at
https://fx-rates.herokuapp.com/
The documentation can be found at
https://fx-rates.herokuapp.com/documentation

## Usage

Documentation for local instance [http://localhost:3000/documentation](http://localhost:3000/documentation)
Documentation for cloud instance https://fx-rates.herokuapp.com/documentation

- Rates will be created in the database with /create-rates service.
- After creating the rates the user can add the markup fee with /add-markup service.
- After creating the rates the user can fetch the data with /get-rates service

## Postman collection

Postman Collection can be found at /postman

- fx-rates.postman_collection.json: API Collection
- fx-rates-local.postman_environment.json: Environment for consuming local instance
- fx-rates-heroku.postman_environment.json:Environment for consuming cloud instance

## Notes

Third party API (Fixer) has limited usage for free subscription accounts. In order to be able to work without worrying about running out of monthly requests a freeSubscriptionDummyData object was defined following Fixer's response structure.

For using dummy data instead of Fixer API the provider is instanciated like so

`const provider = new Provider({ subscriptionType: "free", useDummyData: true, });`

Last version of main branch has `useDummyData:false` in order to fetch the API instead of using the dummy data.
