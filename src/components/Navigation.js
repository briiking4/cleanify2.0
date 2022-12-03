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
        <button type="button" className="btn btn-danger btn-sm mx-0 logout float-right" >Log Out</button>
    </div>

      <Navbar className="fixed-bottom navbar" >
          <Nav className="mx-auto">

            <Link className="btn" to="/"><HomeIcon className={`nav-bar-icon  ${
              props.location.pathname === "/" ? "active" : ""
            }`} /></Link>

            <Link className="btn" to="/search"><Search className={`nav-bar-icon  ${
              props.location.pathname === "/search" ? "active" : ""
            }`} /></Link>

            <Link className="btn" to="/library"><LibraryMusic className={`nav-bar-icon  ${
              props.location.pathname === "/library" ? "active" : ""
            }`} /></Link>

          </Nav>
      </Navbar>

    </>

  );
}

export default withRouter(Navigation);
