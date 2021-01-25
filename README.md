# Quickstarts

This is early WIP work to modularize OpenShift's quickstarts
https://quickstarts.netlify.app/

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

### Localization
Export the i18n instance out so that consumers can switch the library's language to a supported one.
[Commit](https://github.com/cloudmosaic/quickstarts/commit/fe24f9be99bfe201862d87131e94592135ff01ed)
### Drawer iframe
For some reason the content within the drawer was in an iframe, I've removed the iframe, see if that breaks anything.
[Commit](https://github.com/cloudmosaic/quickstarts/commit/d235430b0d1d7c561c8957f2a84d9220e871df36)
### Styling
Need to consolidate all the required bits and pieces for the styling and prune what is not needed. Pulls in styles from various sources: bootstrap, PF3, PF4, custom
[Commit](https://github.com/cloudmosaic/quickstarts/commit/d235430b0d1d7c561c8957f2a84d9220e871df36)
### Bundle size
Bundle is too heavy, see packages/module/stats.html
[Commit#1](https://github.com/cloudmosaic/quickstarts/commit/ca2d575e32b46b344724de5ce6f2057107a63c75)
[Commit#2](https://github.com/cloudmosaic/quickstarts/commit/034640f76d89624fbdeb78cbf34f74fafed6c009)
### Files
Provide path to provide quickstart yaml/json files to the components
[Commit](https://github.com/cloudmosaic/quickstarts/commit/2de199036f7ed9bf77c3330d26f84207379bc1e1)

## TODO
### Styling (continued)
Need to adjust styles to match OS
### Federated module
Look into use-case/need and possibly create a federated quickstarts module
### Improve HMR
Speed up watching for file changes and reloading dev env
### React router
Is react-router-dom needed? See if we can pull it out
### Redux/Local Storage
Support saving to local storage like it's done in OS, i.e.
key: bridge/quick-start-redux-state
value: {"activeQuickStartId":"explore-serverless","allQuickStartStates":{"explore-serverless":{"status":"Not started","taskNumber":-1,"taskStatus0":"Initial","taskStatus1":"Initial"}}}
### Ease yaml dev
See if we can provide a template or generate yaml files so it's easier to author content
