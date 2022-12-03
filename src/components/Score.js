import React, { useState, useEffect } from 'react';

import Perspective from 'perspective-api-client';
import Search from './Search';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Score.css'


function Score(props) {

  const songTitle = props.title
  const songArtist = props.artist
  console.log(songTitle)


  const [lyrics, setLyrics] = useState('')
  const [score, setScore] = useState({sexually_explicit: '', profanity: ''})

  const perspective = new Perspective({apiKey: process.env.REACT_APP_PERSPECTIVE_API_KEY});


  useEffect(()=>{

      async function getScore(){
        try{
          let requestUrl = `https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`
          let lyricsResult = await fetch(requestUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}})
          lyricsResult = await lyricsResult.json()
          let lyrics = lyricsResult.lyrics.replace(/.*/, "").substr(1)
          setLyrics(lyrics);

          const perspectiveResult = await perspective.analyze(lyrics, {attributes: ['PROFANITY','SEXUALLY_EXPLICIT', 'THREAT','TOXICITY']});
          console.log(perspectiveResult)
          const sex = perspectiveResult.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value
          const profanity = perspectiveResult.attributeScores.PROFANITY.summaryScore.value

          setScore({sexually_explicit: sex * 100, profanity: profanity * 100 })
        }
        catch(e){
          console.log('Catch an error: ', e)

        }

      }

      getScore()
  },[props.title]);

  console.log(score.profanity)


   return (

      <div id="score" className="pt-5 row">
        <div className="donut col">
          <CircularProgressbar value={score.sexually_explicit}
          text={`${Math.round(score.sexually_explicit)}%`}
          styles={buildStyles({
            pathColor: `${score.sexually_explicit <= 33.33 ? '#4caf50' : (score.sexually_explicit > 33.67 && score.sexually_explicit < 66.67) ? '#ffc107' : score.sexually_explicit >= 66.67 ? '#b70000' : '' }`,
            textColor: `${score.sexually_explicit <= 33.33 ? '#4caf50' : (score.sexually_explicit > 33.67 && score.sexually_explicit < 66.67) ? '#ffc107' : score.sexually_explicit >= 66.67 ? '#b70000' : '' }`
          })}
           />

           <p className="font-weight-bold mt-1">Sexual</p>
        </div>

        <div className="donut col">
          <CircularProgressbar value={score.profanity}
          text={`${Math.round(score.profanity)}%`}
          styles={buildStyles({
            pathColor: `${score.profanity <= 33.33 ? '#4caf50' : (score.profanity > 33.67 && score.profanity < 66.67) ? '#ffc107' : score.profanity >= 66.67 ? '#b70000' : '' }`,
            textColor:`${score.profanity <= 33.33 ? '#4caf50' : (score.profanity > 33.67 && score.profanity < 66.67) ? '#ffc107' : score.profanity >= 66.67 ? '#b70000' : '' }`
          })}
          />
          <p className="font-weight-bold mt-1">Profanity</p>
        </div>

      </div>
    );
}

export default Score
