import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Html from './containers/Html';
import CriticalError from './components/CriticalError';

export default function render(locals, callback) {
  const content = renderToStaticMarkup(<CriticalError />);
  const htmlString = renderToStaticMarkup(<Html isError content={content} />);

  callback(null, `<!doctype html>\n${htmlString}`);
}
