import React, { useState, useEffect } from 'react';

function WebPlayback(props) {

  const [player, setPlayer] = useState(undefined);

  useEffect(() => {

    console.log(props.token)


      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new window.Spotify.Player({
              name: 'Cleanify',
              getOAuthToken: cb => { cb(props.token); },
              volume: 0.5
          });

          setPlayer(player);
          console.log(player)

          player.addListener('ready', ({ device_id }) => {
              console.log('Ready with Device ID', device_id);
          });



          player.addListener('not_ready', ({ device_id }) => {
              console.log('Device ID has gone offline', device_id);
          });


          player.connect().then((success) => {
            if (success) {
              console.log("success")
            }

         });

      };
  }, []);

   return (
      <>
        <div className="player fixed-bottom">
          <div className="row">
            <div className="col mt-n2">
              <i className="fas fa-step-forward fa-2x"></i>
            </div>

            <div className="col mt-n2">
              <i className="fas fa-play fa-2x"></i>
            </div>

            <div className="col mt-n2">
              <i className="fas fa-step-backward fa-2x"></i>
            </div>



          </div>
        </div>
      </>
    );
}

export default WebPlayback
