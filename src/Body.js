import React from 'react';
import './Body.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { useDataLayerValue } from './DataLayer';
import Header from './Header';
import SongRow from './SongRow';



function Body({spotify}) {
    const [{discover_weekly},dispatch] = useDataLayerValue();

    const playPlaylist = (id) => {
        spotify
          .play({
            context_uri: `spotify:playlist:7DYHoZ1j8X5mV0jx9otUnw`,
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
              dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
      };
    
      const playSong = (id) => {
        spotify
          .play({
            uris: [`spotify:track:${id}`],
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
              dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
      };
    

    return (
        <div className="body">
            <Header spotify={spotify}/>
            <div className="body_info">
              <img src={discover_weekly?.images[0]?.url} alt=""/>
              <div className="body_infoText">
                  <strong>PLAYLIST</strong>
                  <h1>Discover Weekly</h1>
                  <p>{discover_weekly?.description}</p>
              </div>
            </div>
            <div className="body_songs">
                <div className="body_icons">
                   <PlayCircleFilledIcon className="body_shuffle" onClick={playPlaylist}/>
                   <FavoriteIcon fontSize="large"/>
                   <MoreHorizIcon/>
                </div>
                {discover_weekly?.tracks.items.map((item) => (
                <SongRow playSong={playSong} track={item.track} />
                ))}
            </div>
        </div>
        
    )
}

export default Body
