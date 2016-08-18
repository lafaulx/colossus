import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import DocumentTitle from 'react-document-title';
import { StyleRoot } from 'radium';

import routes from './routes';
import { configureStore } from './store';
import performContainerStaticMethod from './utils/performContainerStaticMethod';
import Html from './containers/Html';

export function renderApp(url, ua) {
  return new Promise((resolve, reject) => {
    const memoryHistory = createMemoryHistory(url);
    const store = configureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    match({ history, routes, location: url }, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
      } else if (redirectLocation) {
        reject({
          status: 301,
          url: redirectLocation.pathname + redirectLocation.search,
        });
      } else if (renderProps) {
        performContainerStaticMethod(renderProps, store)
        .then(() => {
          const content = renderToString(
            <Provider store={store}>
              <StyleRoot radiumConfig={{ userAgent: ua }}>
                <RouterContext {...renderProps} />
              </StyleRoot>
            </Provider>
          );

          const title = DocumentTitle.rewind();
          const htmlString = renderToString(
            <Html title={title}
              content={content}
              store={store}
              radiumConfig={{ userAgent: ua }}
            />
          );

          resolve(`<!doctype html>\n${htmlString}`);
        })
        .catch((e) => {
          reject(e);
        });
      }
    });
  });
}
