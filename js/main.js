'use strict';

require('../css/app.css');

import React from 'react';
import ReactDOM from 'react-dom';
import Typewriter from './components/typewriter';

if (typeof window !== 'undefined') {
  window.React = React;
}

ReactDOM.render(
  <Typewriter />,
  document.getElementById('app')
);