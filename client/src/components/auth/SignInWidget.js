import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';
import logo from "../pages/capturemefinal.png";

// https://dev-680655.okta.com/oauth2/v1/authorize?idp=0oaij9x751cV7zUvV356&client_id=0oaiiphavOO8bpeh2356&response_type=code&response_mode=fragment&scope=openid&redirect_uri=https://dev-680655.okta.com/oauth2/v1/authorize/callback&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601&nonce=foobar

class SignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      clientId: '0oaiiphavOO8bpeh2356',
      logo: logo,
      redirectUri: "http://localhost:3000/implicit/callback",
      authParams: {
        scope: [
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
        { type: 'GOOGLE', id: '0oaij9x751cV7zUvV356' }
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