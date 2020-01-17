import React from 'react';
import ReactDOM from 'react-dom';
import {AppProvider} from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/styles.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';

ReactDOM.render(<AppProvider i18n={en}><App /></AppProvider>, document.getElementById('root'));

serviceWorker.unregister();