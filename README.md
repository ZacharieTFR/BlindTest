# Blind-test

This app is a "Blind-test". Challenge yourself and your friends with this music quiz ! Select a theme and you will have thirty seconds to guess each title !

This app was developed using [ReactJS](https://reactjs.org/) + [react-bootstrap](https://react-bootstrap.github.io/).
Leveraging the [Deezer API](https://developers.deezer.com/api) for fetching audio and playlists + [d3.js](https://d3js.org/) for audio visualization. [React-router](https://reacttraining.com/react-router/) was used for Routing and [react-i18next](https://react.i18next.com/) for internationalization. Tests were written with [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/)

> Demo [here](https://zacharietfr.github.io/BlindTest) !

## Next features

- Add [Redux](https://redux.js.org/)
- More tests

## Known issues

The demo is hosted on github pages which doesn't support natively SPA, so if you try to access quizz themes directly from the adress bar you will end with a 404 since routing is client side. Use the app from the [homepage](https://zacharietfr.github.io/BlindTest).

## How to run

### For development

- Go to the project directory
- Execute npm start
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### For production

- Go to the project directory
- Execute npm run build
- Deploy the build folder to your server
