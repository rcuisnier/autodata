/* setup.js */

const {JSDOM} = require('jsdom');

const {window} = new JSDOM('<!doctype html><html><body></body></html>');
const {document, Element, location, history} = window;

// allows to add tests for the Carousel
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

Object.assign(global, {
  window,
  document,
  Element,
  location,
  history,
  navigator: {userAgent: 'node.js'},
});