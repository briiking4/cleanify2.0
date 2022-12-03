import React, { useState, useEffect, useRef } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import ListItems from './ListItems'
import Profile from './Profile'
import logo from '../logo.png'
import './Search.css';


const spotifyApi = new SpotifyWebApi();

function Search(props) {

  const location = props.location
  console.log(location)

  const [searchList, setSearchList] = useState(null);
  const [recentList, setRecent] = useState(null);
  const [playlistList, setPlaylists] = useState(null);
  const [userTracksList, setUserTracks] = useState(null);
  const [value, setValue] = useState('');
  const [filterStatus, setStatus] = useState('track');
  const [searchItemSelected, setSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState('')
  const [loadingData, setLoading] = useState(true)

  const isMounted = useRef(true);

  useEffect(() => {
    console.log("mounted")

    async function getRecentItems(){
      let searchResult = await spotifyApi.getMyRecentlyPlayedTracks()
      console.log(searchResult)
      let list= []
      for (let i of searchResult.items){
        list.push(i.track)
      }
      console.log("RECENT")
      setRecent(list)
    }
    if(location == 'library'){
      getRecentItems()
    }
    return () => {
      setRecent({}); // This worked for me
    };

     },[]);

  useEffect(() =>{
    async function getUserPlaylists(){
      let total = 1
      let itemCount = 0
      let list = []
      while(itemCount < total){
        let response = await spotifyApi.getUserPlaylists({limit:50,offset:itemCount})
        const items = await response
        itemCount += items.items.length
        total = items.total
        list = list.concat(items.items)
      }
      console.log(list)
      setPlaylists(list)
    }
    if(location == 'library'){
      getUserPlaylists()
    }
    return () => {
      setPlaylists({}); // This worked for me
    };

  },[]);

  useEffect(() =>{
    async function getUserTracks(){
      let total = 1
      let itemCount = 0
      let list = []
      while(itemCount < total){
        let response = await spotifyApi.getMySavedTracks({limit:50,offset:itemCount})
        const items = await response
        itemCount += items.items.length
        total = items.total
        for (let i of items.items){
          list.push(i.track)
        }
      }
      console.log("TRACKS")
      setUserTracks(list)
      setLoading(false)
    }
    if(location == 'library'){
      getUserTracks()
    }
    return () => {
      setUserTracks({});
    };

  },[]);


  // const getRecentItems = async () =>{
  //   try{
  //     let searchResult = await spotifyApi.getMyRecentlyPlayedTracks()
  //     console.log(searchResult)
  //     let list= []
  //     for (let i of searchResult.items){
  //       list.push(i.track)
  //     }
  //    setRecent(list)
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }


  const search = async (value, type) => {
    try{
      let searchValue = value.toLowerCase()
      if (location == 'library'){
        let searchList = []
        console.log("in Library")
        console.log(userTracksList)
        console.log(playlistList)

        if(type == 'track'){
          for(let i of userTracksList){
            let name = i.name.toLowerCase()
            if(name.includes(searchValue)){
              console.log(name)
              console.log(name.includes(value))

              searchList.push(i)
            }
          }
          setSearchList(searchList)
        }
        if(type == 'playlist'){
          for(let i of playlistList){
            let name = i.name.toLowerCase()
            if(name.includes(searchValue)){
              searchList.push(i)
            }
          }
          setSearchList(searchList)
        }
      }else{
        let response= ''
        let list = []
        response = await spotifyApi.search(value, [type])
        const items = await response
        console.log(items)
        if(type == 'track'){
           list = items.tracks.items
        }
        if(type == 'playlist'){
           list = items.playlists.items
        }
        console.log(list)
        setSearchList(list)
      }

    }
    catch(e){
      console.log(e)

    }
  }
// add in search whether or not its in their library -- ultimate to set search list
  const searchOnChange = async (e) =>{
    if(e.target.value == ''){
      setSearchList(null)
    }
     console.log(e.target.value)
     search(e.target.value, filterStatus)
     setValue(e.target.value)
  }

  function renderItems() {
    console.log(searchList)

    let items = <p className="pt-3">Search items</p>
      items = <ListItems list={searchList} type={filterStatus} itemSelected={setSelected} selectedItem={setSelectedValue}/>
    return items;
  }

  function renderRecentPlayedTracks() {
    console.log(recentList)
    let items =
      <>
        <p className="pt-3 text-left text-muted">Recently Played</p>
        <ListItems list={recentList} type={filterStatus} itemSelected={setSelected} selectedItem={setSelectedValue}/>
      </>
    return items;
  }
  function renderUserPlaylists() {

    let items =
      <>
        <p className="pt-3 text-left text-muted">Playlists</p>
        <ListItems list={playlistList} type={filterStatus} itemSelected={setSelected} selectedItem={setSelectedValue}/>
      </>
    return items;
  }



  const filterChange = (e) => {
    console.log(e.target.value);
    if(e.target.value == 'track'){
      setStatus('track')
      setSearchList(null)
    }
    if(e.target.value == 'playlist'){
      setStatus('playlist')
      setSearchList(null)

    }

  }



   return (
     <div>
      { searchItemSelected ?

        <Profile id={selectedValue.id} name={selectedValue.name} artist={selectedValue.artist} type={selectedValue.type} location={location} />

      :
      <div id="search" className="">
      {location == 'library' ?
        <h3 className="text-left text-yellow font-weight-bold">Your Library</h3>
        :
        <h3 className="text-left text-yellow font-weight-bold">Search</h3>

      }
        <div className="d-flex filter justify-content-center">
          <button type="button" value="track" onClick={e => filterChange(e)}
          className={`btn filter-option ${filterStatus == 'track' ? 'selected-option' : ''}`}>
          {location == 'library' ?
            "Liked"
            :
            "Song"
          }</button>
          <button type="button" value="playlist" onClick={e => filterChange(e)} className={`btn filter-option ${filterStatus == 'playlist' ? 'selected-option' : ''}`}>Playlists</button>

        </div>

          <input value={value}
                 onChange = {e => searchOnChange(e)}
                 className="search-input"
                 placeholder="search track, playlist, or artist"
          />

        {searchList && value != '' ?
          renderItems()
          :
          <></>

        }
        {
          recentList && value == '' && filterStatus == 'track' && location == 'library' ?
           renderRecentPlayedTracks()
          :
          <></>
        }
        {
          playlistList && value == '' && filterStatus == 'playlist' && location == 'library' ?
           renderUserPlaylists()
          :
          <></>
        }


      </div>

      }
      </div>
    );
}

export default Search
