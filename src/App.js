import React ,{useEffect,useState} from 'react'
import './App.css';
import Login from './Login';
import Player from './Player';
import {useDataLayerValue} from './DataLayer';
import Spotifywebapi from 'spotify-web-api-js';
import { getTokenFromUrl } from './spotify';

const Spotify = new Spotifywebapi();

function App() {
 const [{user,token},dispatch] = useDataLayerValue();
  useEffect(()=>{
  const hash = getTokenFromUrl();
  window.location.hash= "";
 
  const _token = hash.access_token;
 if(_token){

   dispatch({
     type:'SET_TOKEN',
     token:_token
   })

   Spotify.setAccessToken(_token);
   Spotify.getMe().then(user =>{


    dispatch({
      type:'SET_USER',
      user:user
    });

   });
   Spotify.getUserPlaylists().then((playlists)=>{
     dispatch({
       type:'SET_PLAYLISTS',
       playlists:playlists
     });
   });

   Spotify.getPlaylist('7DYHoZ1j8X5mV0jx9otUnw').then((response)=>{
     dispatch({
     type:'SET_DISCOVER_WEEKLY',
     discover_weekly:response
     });
   });
 }
  },[]);

  console.log(user);
  console.log(token);
 
  return (
    <div className="App">
      {
        user?(
        <Player spotify={Spotify}/>
        ):(
        <Login/>
        )
      }
     
    </div>
  );
}

export default App;
