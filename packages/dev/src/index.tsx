import '@patternfly/react-core/dist/styles/base.css';
// TODO: patternfly.css is needed only in prod, investigate why
import '@patternfly/patternfly/patternfly.css';
import '@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css';
import "@cloudmosaic/quickstarts/dist/quickstarts.css";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
