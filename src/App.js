import React, {Component} from 'react';
import profPic from './profPic.png';
import logo from './logo.png'
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

import './App.css';
import Library from './components/Library'
import Home from './components/Home'

import Navigation from './components/Navigation'
import Login from './components/Login'
import Stream from './components/Stream'
import MainSearch from './components/MainSearch'


import SpotifyWebApi from 'spotify-web-api-js';
import ReactGA from 'react-ga';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



const spotifyApi = new SpotifyWebApi();


class App extends Component {

constructor (){
  super();
  const params = this.getHashParams();
  const token =  params.access_token;

  if (token) {
     spotifyApi.setAccessToken(token);
  }

    ReactGA.initialize('UA-172518785-1');
    ReactGA.pageview(window.location.pathname);

  this.state ={
    userId: '',
    loggedIn: token ? true : false,
    profPic: '',
    name: '',
    devices: '',
    token: ''
  }

  this.logout = this.logout.bind(this)
}

 getHashParams() {
  console.log("hi");
   var hashParams = {};
   var e, r = /([^&;=]+)=?([^&;]*)/g,
       q = window.location.hash.substring(1);
       console.log(q);
   while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
   }
   console.log(hashParams);

   return hashParams;
 }


  getUserProfile(){
    spotifyApi.getMe()
      .then((response) => {
        if ((response.images.length === 0)){
          this.setState ({
            userId: response.id,
            profPic: profPic,
            name: response.display_name
          })
        }else{
          this.setState ({
            userId: response.id,
            profPic: response.images[0].url,
            name: response.display_name
          })
        }
      })
  }

  componentDidMount(){
      this.getUserProfile()
  }

  logout(){
    this.setState({
      loggedIn:false
    })
    window.location.href = ""
  }



  render(){
    const userId = this.state.userId
    let token = ''

    if (this.state.loggedIn){
      token = spotifyApi.getAccessToken()
    }


    return (

      <div className="App">

        {
          this.state.loggedIn ?
           <div>
            <Router>
              <Navigation userName= {this.state.name} userPic= {this.state.profPic}  />
              <Switch>
                <Route path="/" exact component={() => <Home />} />
                <Route path="/search" exact component={() => <MainSearch />} />
                <Route path="/library" exact component={() => <Library />} />


              </Switch>
            </Router>

            </div>
          :
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
        }

      </div>
    );
  }
}

export default App;
