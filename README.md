# Backend Wellness Event App

This is a repository for web application that will facilitate the online booking of wellness events (health talks, onsite screenings, etc) and the vendor approval or rejection of said events.

## Frameworks / Libraries

1. NodeJS - ExpressJS
2. MongoDB - Mongoose
3. JSON Web Token

And several other libraries...

## How to run this app ?

1. Clone this repository
2. Run `yarn add` or `npm i` to install modules that required to run this app
3. Copy / rename the `.env.example` file to `.env` and match it with the configuration in your server
4. See the `src/databases/seeders` folder and make/replace with your DB seed configuration and then run `yarn seed` or `npm run seed`
5. Run the backend server with :
   - `Development` (with nodemon) : `yarn dev` or `npm run dev`
   - `Production` (with node) : `yarn start` or `npm run start`
