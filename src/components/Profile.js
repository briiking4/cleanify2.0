import React, { useState, useEffect } from 'react';
import ListItems from './ListItems'
import CleanPlaylist from './CleanPlaylist'
import Lyrics from './Lyrics'
import Score from './Score'
import Library from './Library'
import MainSearch from './MainSearch'
import Home from './Home'


import SpotifyWebApi from 'spotify-web-api-js';
import './Profile.css'
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import OpacityIcon from '@material-ui/icons/Opacity';
import Explicit from '@material-ui/icons/Explicit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LyricsIcon from '@mui/icons-material/Lyrics';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


const spotifyApi = new SpotifyWebApi();


function TrackProfile(props) {

const id  = props.id
const name = props.name
const artist = props.artist
const type= props.type
const location = props.location
console.log(location)


const [tracksList, setList] = useState(null)

const [trackInfo, setInfo] = useState({id:'' , name:'', photo: ''})

const [lyricsOn, setLyricsOn] = useState(false)

const [scoreOn, setScoreOn] = useState(false)

const [buttonClicked, setButton] = useState(false)



  useEffect(()=>{

    console.log(type)

    async function getTracks(name, artist){
      let searchResult = await spotifyApi.search('track: ' +name+ ' artist: '+ '"'+ artist + '"' ,['track'])
      console.log(searchResult)

      setList(searchResult.tracks.items)
    }

    async function getTrackInfo(id){
      let searchResult = await spotifyApi.getTrack(id)
      setInfo({id: id, name: searchResult.name, artist:searchResult.artists[0].name, explicit:searchResult.explicit, photo: searchResult.album.images[0].url})
      console.log(searchResult)
    }

    if (type == 'track'){
      console.log("IM IN")
      getTracks(name, artist)
      getTrackInfo(id)
    }

  },[]);

function renderTag(){
  let state = '';
  let color = '';
  if (trackInfo.explicit ){
    state = 'EXPLICIT'
    color = 'text-danger'
  }else{
    state = 'CLEAN'
    color = 'text-warning'

  }

  let tag = <div className={`explicit-tag ${color}`} >
              <p className="explicit-text">{state}</p>
            </div>

  return tag;
}

function showLyrics(){
  setLyricsOn(!lyricsOn)
}

 function findCleanTrack(list){
  var cleanTrack;
  var itemC;
  var counter = 0;
    for (itemC of list){
      if (itemC.explicit === false){
        if((itemC.name === name || itemC.name.includes("Clean")) && (itemC.artists[0].name === artist && counter <= 0) ){
          cleanTrack = itemC
          counter ++
        }
      }
    }
    if (counter === 0 ){
      cleanTrack = null
    }

    return cleanTrack
}

function renderClean(){
  let list = []
  let cleanTrack = findCleanTrack(tracksList)
  list.push(cleanTrack)
  console.log(list)

  const showTrack = cleanTrack ?
                      <ListItems list={list} type='track'/>
                    :
                    <h6>There are no clean versions</h6>

  return showTrack
}

function showScore(){
  setScoreOn(!scoreOn)
}

function handleBackButton(){
  setButton(true)
}

//profile when clicked in list on clean verisons not working


   return (


     <div id="profile" className="">
     { buttonClicked ?
        location == 'search' ?
         <MainSearch/>
         :
         location == 'library' ?
         <Library/>
         :
         <Home/>
       :
       <>
       <div className="text-left">
         <button className="btn mt-n2 mb-n2 ml-n1" onClick={() => handleBackButton()}><ArrowCircleLeftIcon className="text-yellow float-left back-arrow"/></button>
       </div>


        { tracksList && type == 'track' ?
          <div>
            <div className="row justify-content-center">

              <img src={trackInfo.photo} id= {trackInfo.id} className="profile-card" alt="card"/>

            </div>

            <div className="row justify-content-center">
             <p className="mt-1 font-weight-bold">{trackInfo.name}

               {trackInfo.explicit ?
               <Explicit className="ml-2 text-danger float-right"/>
               :
               <></>
               }
             </p>
            </div>

            <div className="row justify-content-center">
             <p className="font-weight-bold">{trackInfo.artist}</p>
            </div>

            <div className="row justify-content-center">
              <div className="col">
               <FavoriteIcon/>
              </div>

              <div className="col">
               <LyricsIcon/>

              </div>
            </div>

            <div>
             <Score title={trackInfo.name} artist={trackInfo.artist}/>

            </div>

            <div>

               <h5 className="mt-4">Clean Version(s)</h5>

               {renderClean()}

            </div>


          </div>
          :
          <></>
        }
        {type == 'playlist' ?
         <CleanPlaylist name={name} data={id}/>
         :
         <></>
        }
        </>
     }
     </div>


    );
}

export default TrackProfile
