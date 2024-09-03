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
        let lyricsResult = await fetch(requestUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}})
        lyricsResult = await lyricsResult.json()
        let lyrics = lyricsResult.lyrics.replace(/.*/, "").substr(1)
        console.log("LYRICS" + lyrics)
        setLyrics(lyrics);
      }
      catch(e){
        setLyrics("false")
        console.log(e)
      }

    }

    getLyrics()

  }, [props.title]);


   return (
      <div>

            <div id="lyrics" className="pt-3">
              <h5>
              {lyrics == 'false' ?
              <p>Lyrics unavalible</p>
              :
              lyrics          
              }
              </h5>
            </div>
 
      </div>
    );
}

export default Lyrics
