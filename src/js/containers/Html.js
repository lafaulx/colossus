import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';
import radium, { Style } from 'radium';

const hash = process.env.hash;

const globalStyles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  },
};

function Html({ store, content, isError, title }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
        {!isError &&
          <script dangerouslySetInnerHTML={{
            __html: `window.__initialState__ = ${serialize(store.getState())};`,
          }}
          />
        }

        <Style rules={globalStyles} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />

        {!isError &&
          <script src={`/static/app.${hash}.js`} />
        }
      </body>
    </html>
  );
}

Html.propTypes = {
  store: PropTypes.object,
  content: PropTypes.string,
  isError: PropTypes.bool,
};

export default radium(Html);

