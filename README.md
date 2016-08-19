# Colossus
This is a biolerplate which gathers the latest and more or less stable React-related components in one place to deliver universal SPA concept for real world. Main buzzwords for SEO: [react](https://github.com/facebook/react), [redux](https://github.com/reactjs/redux), [react-router](https://github.com/reactjs/react-router), [react-redux-router](https://github.com/reactjs/react-router-redux) – for full list check `package.json`.

## WTF?
My goal was to create a clear and simple architecture which supports both async Redux actions, client-side routing and server-side rendering and here's brief story that covers the main parts.

Firstly we define routes and containers for them – containers have static method `fetchData` where you're able to call page-specific async actions to get data from the server on page load with [redux-api-middleware](https://github.com/agraboso/redux-api-middleware) and [redux-actions](https://github.com/acdlite/redux-actions). To restore state during server-side rendering we use technique described in [react-router-redux SSR example](https://github.com/reactjs/react-router-redux/tree/master/examples/server) with small adjustment – we go through components tree for this route to execute all `fetchData` promises – after this promises are resolved and state goes in line with the route we're able to render components on the page with commonly used technique. To call static method `fetchData` on client side we use `history.listen` function from [react-router-redux](https://github.com/reactjs/react-router-redux#how-do-i-watch-for-navigation-events-such-as-for-analytics) – in a callback for history change we use the same `match` techique to fetch components tree and call async actions from the containers. Simple action calls and state props binding are achieved by classic [react-redux connect decorator](http://redux.js.org/docs/basics/UsageWithReact.html).

After this brief intro feel free to check the code itself – it most probably describes itself much better.


## How to run this stuff?
  - `npm install -g webpack`
  - `npm install`
  - `npm start`
  - go to localhost:3000

## TODO
This is a very raw but working setup and I want to imporove some things:
  - add scripts for dev and prod environments
  - remove js dir
  - add pure component render
  - add tests
  - normal linting
  - add redux dev tools
  - remove redux logger on server
