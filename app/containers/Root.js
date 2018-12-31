import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import App from './App';
import { createGlobalStyle } from 'styled-components'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };
  
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <React.Fragment>
          <App />
          <GlobalStyle />
        </React.Fragment>
      </Provider>
    );
  }
}

const GlobalStyle = createGlobalStyle`
html, body, div, span, iframe, ol, ul, li, label, button {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
  user-select: none;
}

html, body {
  height: 100%;
}

#root {
  height: 100%;
}

ul, ol {
  list-style: none;
}

${'' /* button:focus {
	outline:none;
} */}

${'' /* button {
  margin: 5px 10px;
} */}

a {
	text-decoration:none;
}
@font-face {
  font-family: SegoeUI;
  src: url(../fonts/SegoeUI.ttf)
}

@font-face {
  font-family: Overpass;
  src: url(../fonts/Overpass-Regular.ttf)
}

@font-face {
  font-family: Roboto;
  src: url(../fonts/Roboto-Regular.ttf)
}
`
