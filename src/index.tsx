import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app';

function applyBlueprintjs() {
  require('normalize.css');
  require('@blueprintjs/core/lib/css/blueprint.css');
  require('@blueprintjs/icons/lib/css/blueprint-icons.css');

  const { FocusStyleManager } = require('@blueprintjs/core');

  FocusStyleManager.onlyShowFocusOnTabs();
}

const render = () => {
  applyBlueprintjs();

  ReactDOM.render(<App />, document.getElementById('root'));
};

if ((module as any).hot) {
  (module as any).hot.accept(() => {
    render();
  });
}

render();
