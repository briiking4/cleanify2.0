import React from "react";
import './Navigation.css';
import { Link, withRouter } from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import logo from '../logo.png'
import HomeIcon from '@material-ui/icons/Home';
import Search from '@material-ui/icons/Search';
import LibraryMusic from '@material-ui/icons/LibraryMusic';



function Navigation(props) {
    const profPic = props.userPic
    const profName= props.userName

  return (
    <>
    <div className="row profile">
        <img src= {profPic} className="profPic rounded-circle img-fluid" alt="profile pic"/>
        <h1 className="profName">{profName}</h1>
    </div>

      <Navbar className="fixed-bottom navbar" >
          <Nav className="mx-auto">

            <Link className="btn mb-2" to="/"><HomeIcon className={`nav-bar-icon  ${
              props.location.pathname === "/" ? "active" : ""
            }`} /></Link>

            <Link className="btn mb-2" to="/search"><Search className={`nav-bar-icon  ${
              props.location.pathname === "/search" ? "active" : ""
            }`} /></Link>

            <Link className="btn mb-2" to="/library"><LibraryMusic className={`nav-bar-icon  ${
              props.location.pathname === "/library" ? "active" : ""
            }`} /></Link>

          </Nav>
      </Navbar>

    </>

  );
}

export default withRouter(Navigation);
