import React, { useState, useEffect } from 'react';
import Lyrics from './Lyrics'
import SpotifyWebApi from 'spotify-web-api-js';
import WebPlayback from './WebPlayback'


const spotifyApi = new SpotifyWebApi();
const token = spotifyApi.getAccessToken()



function Stream() {


   return (

      <div id="stream" className="pt-5">
        <WebPlayback token= {token}/>

      </div>
    );
}

export default Stream
