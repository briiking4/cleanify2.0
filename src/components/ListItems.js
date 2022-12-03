import React, { useState, useEffect } from 'react';
import './ListItems.css';
import Profile from './Profile';
import Explicit from '@material-ui/icons/Explicit';
import logo from '../logo.png'
import musicNote from '../emptyPlaylist.png'




function ListItems(props) {
  console.log("rendered")
  console.log("list" + props.list)


  const list = props.list
  const type = props.type
  const horizOn = props.horiz

  console.log('type ' + type)

  const [selected, setSelect] = useState(false)

  const [selectedValue, setValue] = useState({id:'', name: '', artist:'', type:''})
// send this to Search

  useEffect(() =>{

  },[props.list,props.type])

  const sendData = (id,name,artist) => {
    setValue({id:id, name: name, artist:artist })
    setSelect(true)
    props.itemSelected(true)
    props.selectedItem({id:id, name: name, artist:artist, type: type })
    console.log("selected")
  }


  const showSearch =
    list.map(function(item) {
        return (
          <div key={item.id} className="p-2" onClick={() => sendData(item.id,item.name,
            type == 'playlist' ?
              item.owner.display_name
            :
            type == 'track' ?
              item.artists[0].name
            :
            <></>
          )

          }
        >
            <div className="row">
              <div className="col-3">

                <img src={
                  type == 'playlist' ?
                    item.images.length > 0 ?
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

              </div>
              <div className="col-8 search-title">
                <div className="row">
                  <div className="col-10">
                    <p className="font-weight-bold text-overflow">{item.name}</p>
                  </div>

                  <div className="col-2">
                  {type == 'track' ?
                    item.explicit ?
                      <Explicit className="ml-2 text-danger"/>
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
        )
    });

    const showSearchHoriz =
      list.map(function(item) {
          return (
            <div key={item.id} className="col-4" onClick={() => sendData(item.id,item.name,
              type == 'playlist' ?
                item.owner.display_name
              :
              type == 'track' ?
                item.artists[0].name
              :
              <></>
            )

            }
          >                <img src={
                  type == 'playlist' ?
                    item.images.length > 0 ?
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

                <p className="text-left text-overflow"><small className="font-weight-bold">{item.name}</small></p>

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
          )
      });

   return (

      <div id="search" className="pt-3">
      {
        horizOn ?
          <div className="row flex-row flex-nowrap horiz">
            {showSearchHoriz}
          </div>
        :
        showSearch
      }


      </div>
    );
}

export default ListItems
