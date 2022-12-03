import React, { useState, useEffect } from 'react';
import logo from '../logo.png'
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

function Login(props) {


   return (

      <div id="login" className="login">
        <Fade top>
        <div>
            <img src={logo} className="logo img-fluid text-center" alt="logo"/>
            <h1 className="logo-title font-weight-bold">Cleanify</h1>
        </div>
        </Fade>
        <Zoom delay={1000}>
          <div>
          <a id="login-button" href="/login" className="btn btn-success">Log in with Spotify</a>
          </div>
        </Zoom>
      </div>
    );
}

export default Login
