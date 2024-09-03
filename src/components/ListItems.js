import React, { useState, useEffect } from 'react';
import './ListItems.css';
import Profile from './Profile';
import Explicit from '@material-ui/icons/Explicit';
import logo from '../logo.png'
import musicNote from '../emptyPlaylist.png'
import ExplicitIcon from '@mui/icons-material/Explicit';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import SpotifyWebApi from 'spotify-web-api-js';
import { useHistory } from 'react-router-dom';


const spotifyApi = new SpotifyWebApi();


function ListItems(props) {
  const history = useHistory();
  const { onSelect } = props;
  // console.log("ListItems rendered. The list is:")
  // console.log(props.list)
  //props.list is a list of track objects 
  const list = props.list
  const type = props.type
  const horizOn = props.horiz
  const addOn = props.addOn

  console.log('type ' + type)

  const [selected, setSelect] = useState(false)

  const [selectedValue, setValue] = useState({id:'', name: '', artist:'', type:''})

  const [trackList, setList] = useState(null)
  

  useEffect(() =>{
    const setItemsList = async () => {
      if (addOn) {
        console.log("Add is ON");
        const updatedList = await appendIfAdded(props.list);
        setList(updatedList);
      } else {
        setList(props.list);
      }
    };
  
    setItemsList();
    console.log("IM IN LIST ITEMS")

  },[trackList, list])


  const updateTrackList = (trackId, key, value) => {
    setList((trackList) => {
      return trackList.map((track) => {
        if (track.id === trackId) {
          track.key = value;
        }
        return track;
      });
    });
  };


  async function appendIfAdded(listItems) {
    let trackIds = [];
    listItems.map((track) => {
      if(type === 'track'){
        console.log(track);
        trackIds.push(track.id);
      }
    })
    let addedTracks = await spotifyApi.containsMySavedTracks(trackIds)
    listItems.map((track, index) =>{
      track.saved = addedTracks[index]
    })
    console.log("APPENDED TrackList");
    console.log(listItems);
    return listItems;
  }

  async function addTrack(trackId){
    let addResult = await spotifyApi.addToMySavedTracks([trackId]);
    console.log("addRESULT");
    console.log(addResult);
    updateTrackList(trackId,"saved",true)
  }

  async function unaddTrack(trackId){
    let removeResult = await spotifyApi.removeFromMySavedTracks([trackId]);
    console.log("unaddRESULT");
    console.log(removeResult);
    updateTrackList(trackId,"saved",false)
  }

  const sendData = (id,name,type) => {
    history.push(`/profile/${type}/${id}`);
  }

  const showSearch = (list) => {
    return list.map(function(item) {
      console.log(item)
      return (
        <div key={item.id} className="row p-2">
            <div className="col-10">
              <div className="row" onClick={() => sendData(item.id,item.name,item.type)}>
                <div className="col-3">

                  <img src={
                    type == 'playlist' ?
                      item.images ?
                        item.images[0].url
                        :
                        musicNote
                    :
                    type == 'track' ?
                      item.album.images.length > 0 ?
                        item.album.images[0].url
                      :
                        musicNote
                    :
                    <></>
                  }
                  id= {item.id}
                  className="search-card"
                  alt="card"/>

                </div>
                <div className="col-8 search-title">
                  
                      <p className="font-weight-bold text-overflow">{item.name}</p>
                 
                 
                  {
                    type == 'playlist' ?
                      <p>{item.owner.display_name}</p>
                    :
                    type == 'track' ?
                      <p>{item.artists[0].name}</p>
                    :
                    <></>
                  }
                </div>
              </div>
            </div>
            <div className="col-2" id={`track-col-${item.id}`}>
              {type == 'track' ?
                props.addOn ?
                  item.saved ? 
                  <CheckIcon onClick={() => unaddTrack(item.id)}/>
                  :
                  <AddIcon onClick={() => addTrack(item.id)}/>

                :
                item.explicit ?
                  <ExplicitIcon className="ml-2 text-danger"/>
                  :
                  <img src={logo} width="45"/>
                :
                item.name.includes("(Clean)") ?
                  <img src={logo} width="45"/>
                  :
                  <></>
              }

            </div>

          </div>
      );
    });
  };

  const showSearchHoriz = (list) => {
    return list.map(function(item) {
      console.log(item)
      return (
        <div key={item.id} className="col-4 col-lg-2" onClick={() => sendData(item.id,item.name,item.type)}>  
            <img src={
              type == 'playlist' ?
                item.images ?
                  item.images[0].url
                  :
                  musicNote
              :
              type == 'track' ?
                item.album.images[0].url
              :
              <></>
            }
            id= {item.id}
            className="search-card"
            alt="card"/>

              <p className="text-left text-overflow mb-0"><small className="font-weight-bold">{item.name}</small></p>

            {
              type == 'playlist' ?
              <p className="text-left text-overflow"><small className="font-weight-bold">{item.owner.display_name}</small></p>
            :
            type == 'track' ?
              <p className="text-left text-overflow"><small className="font-weight-bold">{item.artists[0].name}</small></p>
            :
            <></>
           }

        </div>
      );
    });
  };

   return (
    <div>
    {/* {
      selected ?
        <Profile id={selectedValue.id} name={selectedValue.name} artist={selectedValue.artist} type={selectedValue.type}/>
        : */}
        <div id="search" className="pt-3">
        {console.log("TRACK LIST AT TIME OF RETURN")}
        {console.log(trackList)}
        
        {
          trackList !== null && (
            horizOn ? (
              <div className="row flex-row flex-nowrap horiz">
                {showSearchHoriz(trackList)}
              </div>
            ) : (
              showSearch(trackList)
            )
          ) 
        }
      </div>

    {/* } */}
    </div>


    );
}

export default ListItems
