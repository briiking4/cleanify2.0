import React, { useState, useEffect } from 'react';
import './Lyrics.css';
import Score from './Score'



function Lyrics(props) {


  const songTitle = props.title.includes("(") ?
                      props.title.substring(0,props.title.indexOf("("))
                    :
                      props.title

  const songArtist = props.artist
  const [lyrics, setLyrics] = useState('')


  useEffect(() => {

    async function getLyrics(){
      try{
        let requestUrl = `https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`
        let response = await fetch(requestUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}})
        response = await response.json()
        let lyrics = response.lyrics.replace(/.*/, "").substr(1)
        setLyrics(lyrics)
      }
      catch(e){
        console.log(e)
      }

    }

    getLyrics()

  }, [props.title]);


   return (
      <div id="lyrics" className="pt-3">
        <h2 className="text-success">{songTitle}</h2>
        <p>{songArtist}</p>
        <h5>
        {lyrics}
        </h5>
      </div>
    );
}

export default Lyrics
