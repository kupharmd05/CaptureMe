import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';
import logo from "../pages/capturemefinal.png";



class SignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      clientId: '0oaiiphavOO8bpeh2356',
      logo: logo,
      // redirectUri: "http://localhost:3000/implicit/callback",
      redirectUri: "https://mysterious-sierra-84651.herokuapp.com/implicit/callback",
      authParams: {
        scopes: [
          'openid',
          'email',
          'profile',
          'address',
          'phone',
          'groups'
        ]
      },
      idpDisplay: 'PRIMARY',
      idps: [
        { type: 'GOOGLE', id: '0oaij9x751cV7zUvV356' },
        // {type: 'FACEBOOK', id:'554609168397933' }
      ]

    });
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
};

export default SignInWidget;