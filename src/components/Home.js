import React, { useState, useEffect } from 'react';
import ListItems from './ListItems'
import Profile from './Profile'
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


function Home(props) {

  const [userTopTracksList, setUserTopTracks] = useState(null)
  const [topTracksList, setTopTracks] = useState(null)
  const [userPlaylists, setUserPlaylists] = useState(null)

  const [searchItemSelected, setSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
      console.log("IM IN")

      async function getUserTopTracks(){
        let searchResult = await spotifyApi.getMyTopTracks()
        const items = await searchResult
        console.log(items.items)
        setUserTopTracks(items.items)

      }
      async function getTopTracks(){
        let list = []
        let searchResult = await spotifyApi.getPlaylistTracks('billboard.com','6UeSakyzhiEt4NB3UAd6NQ',{limit:20})
        const items = await searchResult
        for (let i of items.items){
          list.push(i.track)
        }
        console.log(list)
        setTopTracks(list)
      }

      async function getPlaylists(){
        let list = []
        let searchResult = await spotifyApi.getUserPlaylists({limit:20})
        const items = await searchResult
        console.log(items.items)
        setUserPlaylists(items.items)
      }

      getUserTopTracks()
      getTopTracks()
      getPlaylists()

    },[]);


   return (

      <div id="Home" className="pt-2">
          {topTracksList &&
            <div>
              <h5 className="text-left font-weight-bold text-yellow">Popular Singles</h5>
              <ListItems horiz={true} list={topTracksList} type='track'/>
            </div>
          }
          {userTopTracksList &&
            <div>
              <h5 className="text-left font-weight-bold text-yellow">Your Top Tracks</h5>
              <ListItems horiz={true} list={userTopTracksList} type='track'/>
            </div>
          }
          {userPlaylists &&
            <div>
              <h5 className="text-left font-weight-bold text-yellow">Your Playlists</h5>
              <ListItems horiz={true} list={userPlaylists} type='playlist'/>
            </div>
          }
      </div>
    );
}

export default Home
