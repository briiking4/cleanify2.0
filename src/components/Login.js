import React, { useState, useEffect } from 'react';
import logo from '../logo.png'


function Login(props) {


   return (

      <div id="login" className="login">
        <div>
            <img src={logo} className="logo img-fluid text-center" alt="logo"/>
            <h1 className="logo-title font-weight-bold">Cleanify</h1>
        </div>
          <div>
          <a id="login-button" href="/login" className="btn btn-success">Log in with Spotify</a>
          </div>
      </div>
    );
}

export default Login
