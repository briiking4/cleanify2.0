import React, { useState, useEffect } from 'react';
import CleanPlaylist from './CleanPlaylist'
import './Library.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Score from './Score'
import Search from './Search'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const spotifyApi = new SpotifyWebApi();

function Library(props) {



   return (

      <div id="library" className="p-2">
        <Search location="library"/>




      </div>
    );
}

export default Library
