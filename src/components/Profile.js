import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListItems from './ListItems'
import CleanPlaylist from './CleanPlaylist'
import Lyrics from './Lyrics'
import Score from './Score'
import Library from './Library'
import MainSearch from './MainSearch'
import Home from './Home'
import BackButton from './BackButton';


import SpotifyWebApi from 'spotify-web-api-js';
import './Profile.css';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import OpacityIcon from '@mui/icons-material/Opacity';
import ExplicitIcon from '@mui/icons-material/Explicit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LyricsIcon from '@mui/icons-material/Lyrics';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const spotifyApi = new SpotifyWebApi();


function Profile(props) {
  const { type, id } = useParams();


// const id  = props.id
// const name = props.name
// const artist = props.artist
// const type= props.type
const location = props.location
// console.log(id)
// console.log(name)


const [tracksList, setList] = useState(null)

const [trackInfo, setInfo] = useState({id: id , name:'', photo: '', explicit: null})

const [lyricsStatus, setShowLyrics] = useState(false)

const [scoreOn, setScoreOn] = useState(false)

const [buttonClicked, setButton] = useState(false)

const [trackItemSelected, setSelected] = useState(false);
const [trackValue, setSelectedValue] = useState('')

useEffect(() => {
  async function fetchData() {
    await getTrackInfo(id);
  }
  fetchData();
}, [id]);

useEffect(() => {
  if (trackInfo.name && trackInfo.artist) {
    async function fetchCleanTracks() {
      await getCleanTracks(trackInfo.name, trackInfo.artist);
    }
    fetchCleanTracks();
  }
}, [trackInfo]);


  async function getCleanTracks(name, artist){
    let searchResult = await spotifyApi.search('track: ' +name+ ' artist: '+ '"'+ artist + '"' ,['track'])
    let cleanTracks = []
    console.log(searchResult)
    searchResult.tracks.items.map((item) =>{
      if(item.artists[0].name === artist && item.explicit === false && type === "track" && item.name.includes(name)){
        cleanTracks.push(item)
      }
    })
    console.log("cleanTracks")
    setList(cleanTracks)
  }

  async function getTrackInfo(id){
    let searchResult = await spotifyApi.getTrack(id)
    setInfo({id: id, name: searchResult.name, artist:searchResult.artists[0].name, explicit:searchResult.explicit, photo: searchResult.album.images[0].url})
  }


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
  console.log("lyrics button pressed. Status = " + lyricsStatus)
  setShowLyrics(!lyricsStatus);
}

function renderClean(){
  console.log(tracksList);

  const showTrack = tracksList.length > 0 ?
                      <ListItems list={tracksList} type='track' addOn/>
                    :
                    <h6>There are no clean versions available for this track</h6>

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

     <div id="profile">
      <BackButton/>
        { tracksList && type == 'track' &&
          <div>
            <div style={{ position: 'relative'}}>
            <Score title={trackInfo.name} artist={trackInfo.artist} image={trackInfo.photo} explicit={trackInfo.explicit}/>
            </div>

            <div className="row justify-content-center mt-4">
             <p className="font-weight-bold">{trackInfo.name}

               {trackInfo.explicit ?
               <ExplicitIcon className="ml-2 text-danger float-right"/>
               :
               <></>
               }
             </p>
            </div>

            <div className="row justify-content-center">
             <p className="font-weight-bold">{trackInfo.artist}</p>
            </div>
{/* 
            <div className="row justify-content-center">
              <div className="col">
               <FavoriteIcon/>
              </div>

              <div className="col">
               <LyricsIcon onClick={() => showLyrics()}/>

              </div>
            </div> */}

            { lyricsStatus == true ?
              <div>
                <Lyrics title={trackInfo.name} artist={trackInfo.artist}/>

              </div>
              :
              <div>  </div>
            }
             { trackInfo.explicit && 

            <div>
               <h5 className="mt-4">Clean Version(s)</h5>
               <div style={{height:"25vh"}} class="overflow-auto">
                {renderClean()}
               </div>

            </div>
             }

          </div>
        }
        {type == 'playlist' &&
         <CleanPlaylist data={id}/>
        }
     </div>


    );
}

export default Profile
