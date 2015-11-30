import React from 'react';
import { render } from 'react-dom';
import Graph from './models/Graph.js';
import App from './components/App.js';

const store = new Graph();

render(<App store={store}/>, document.getElementById('react-mount'));

store.addTask({
  name: 'foo',
  x: 200,
  y: 200
});
