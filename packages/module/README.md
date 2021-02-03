# Quickstarts

Demo
https://quickstarts.netlify.app/

## Install

Note: These instructions can change over time as the module gets more refined

```bash
`yarn add @cloudmosaic/quickstarts`
or
`npm install @cloudmosaic/quickstarts --save`
```

The package currently has these peer dependencies:

```
"react": ">=16.14.0",
"react-dom": ">=16.14.0"
```

Additionally for styles the package depends on (might bundle these up as vendor.css in the future):

```
@patternfly/patternfly
@patternfly/react-catalog-view-extension
```

In your web-apps entry point, add this (these should be imported before modules from the package are imported):

```js
import "@patternfly/patternfly/base/patternfly-shield-inheritable.css";
import "@patternfly/patternfly/patternfly.min.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import "@cloudmosaic/quickstarts/dist/quickstarts.css";
```

## Usage

In your main app file wrap your application:

```js
import {
  QuickStartDrawer,
  QuickStartContext,
  QuickStartCatalogPage,
  useValuesForQuickStartContext,
  useLocalStorage,
} from "@cloudmosaic/quickstarts";
// for how these yaml files should look see below
import quickstartOne from '.yamls/quickstart-one.yaml';
import quickstartTwo from '.yamls/quickstart-two.yaml';

const App = () => {
  const allQuickStarts = [
      quickstartOne,
      quickstartTwo
  ];
  const [activeQuickStartID, setActiveQuickStartID] = useLocalStorage(
    "quickstartId",
    ""
  );
  const [allQuickStartStates, setAllQuickStartStates] = useLocalStorage(
    "quickstarts",
    {}
  );
  const valuesForQuickstartContext = useValuesForQuickStartContext(
    allQuickStarts,
    activeQuickStartID,
    setActiveQuickStartID,
    allQuickStartStates,
    setAllQuickStartStates
  );

  return (
    <QuickStartContext.Provider value={valuesForQuickstartContext}>
      <QuickStartDrawer>
        <div>
          <h1>My app</h1>
          <button
            onClick={() =>
              valuesForQuickstartContext.setActiveQuickStart("a quickstart id")
            }
          >
            Open a quickstart
          </button>
          <QuickStartCatalogPage />
        </div>
      </QuickStartDrawer>
    </QuickStartContext.Provider>
  );
};
```

## Webpack
You can reduce the size of your CSS bundle by using `clean-css-loader` and `null-loader`:
`yarn add -D clean-css-loader null-loader` or `npm install --save-dev clean-css-loader null-loader`
In the webpack config:
```js
const isProd = argv.mode === "production";
const cssLoaders = ["style-loader", "css-loader"];
if (isProd) {
// push loader for production mode only
    cssLoaders.push("clean-css-loader");
}
```
In the rules array:
```js
{
    test: /\.css$/,
    use: cssLoaders,
},
{
    test: /\.css$/,
    include: stylesheet => stylesheet.includes('@patternfly/react-styles/css/'),
    use: ["null-loader"]
},
```

## yaml
This section will get more info in the future. For now you can view sample yamls here:
https://github.com/cloudmosaic/quickstarts/tree/main/packages/dev/src/quickstarts-data/mocks/yamls
