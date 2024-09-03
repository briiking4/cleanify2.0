import React, { useState, useEffect } from 'react';
import CleanPlaylist from './CleanPlaylist'
import './Library.css';
import Search from './Search'


function Library(props) {



   return (

      <div id="library" className="p-2">
        <Search location="library"/>


      </div>
    );
}

export default Library
