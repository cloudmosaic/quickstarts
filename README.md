# Quickstarts

## Setup

```bash
https://github.com/cloudmosaic/quickstarts.git
cd quickstarts
yarn install && yarn build && yarn start
```

## Development Scripts
```sh
# Install development/build dependencies
yarn install

# Start the development server
yarn start

# Run a production build (outputs to "packages/module/dist" dir)
yarn build

# Run the test suite
# yarn test

# Run the linter
# yarn lint

# Run the code formatter
# yarn format

# Launch a tool to inspect the bundle size
# yarn bundle-profile:analyze
```

## TODO
### Localization
The library pulls in i18next. A related package appears to use node modules. In Webpack 5, node modules are no longer bundled so it won't find them. It is possible to polyfill them back into Webpack 5, but a better solution should be found.
Possibly even remove i18next from the library and have consumers provide a json file to it for translations?
### Drawer iframe
For some reason the content within the drawer was in an iframe, I've removed the iframe, see if that breaks anything.
### Styling
Need to consolidate all the required bits and pieces for the styling and prune what is not needed. Pulls in styles from various sources: bootstrap, PF3, PF4, custom
### Bundle size
Bundle is too heavy, see packages/module/stats.html
### Files
Provide path to provide quickstart yaml/json files to the components
### Federated module
Look into creating a federated quickstarts module
### Improve HMR
Speed up watching for file changes and reloading dev env
### React router
Is react-router-dom needed? See if we can pull it out