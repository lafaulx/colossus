import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import { configureStore } from './store';
import performContainerStaticMethod from './utils/performContainerStaticMethod';

export function renderApp(url) {
  const memoryHistory = createMemoryHistory(url);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  return new Promise((resolve, reject) => {
    match({ history, routes, location: url }, (error, redirectLocation, renderProps) => {
      if (error) {
        reject({
          status: 500,
          message: error.message,
        });
      } else if (redirectLocation) {
        reject({
          status: 301,
          url: redirectLocation.pathname + redirectLocation.search,
        });
      } else if (renderProps) {
        performContainerStaticMethod(renderProps, store).then(() => {
          const content = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          const html = renderToString(
            <html>
              <head>
                <meta charSet="utf-8" />
                <title>Colossus</title>

                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
                <link href="/static/app.css" rel="stylesheet" />
                <script dangerouslySetInnerHTML={{
                  __html: `window.__initialState__ = ${serialize(store.getState())};`,
                }}
                />
              </head>
              <body>
                <div id="app" dangerouslySetInnerHTML={{ __html: content }} />

                <script src="/static/app.js" />
              </body>
            </html>
          );

          resolve(`<!doctype html>\n${html}`);
        });
      }
    });
  });
}
