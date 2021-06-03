import React,{useEffect} from 'react';
import './Footer.css';
import {useDataLayerValue} from './DataLayer';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import SkipPreviousOutlinedIcon from '@material-ui/icons/SkipPreviousOutlined';
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
import ShuffleOutlinedIcon from '@material-ui/icons/ShuffleOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';

import { Grid, Slider,IconButton } from '@material-ui/core';


function Footer({spotify}) {
    const [{ token, item, playing }, dispatch]= useDataLayerValue() ;
    
    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
          console.log(r);
    
          dispatch({
            type: "SET_PLAYING",
            playing: r.is_playing,
          });
    
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
        });
      }, [spotify]);
    
      const handlePlayPause = () => {
        if (playing) {
          spotify.pause();
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        } else {
          spotify.play();
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }
      };
    
      const skipNext = () => {
        spotify.skipToNext();
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
      };
    
      const skipPrevious = () => {
        spotify.skipToPrevious();
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
      };
    



    return (
        <div className="footer">
            <div className="footer_left">
               <img className="footer_AlbumLogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCS-wmISaJS_gwIGFBBUo8740KabEWFHqV2Q&usqp=CAU" alt=""/>
               <div className="footer_songInfo">
                   <h4>I'm Ready</h4>
                   <p>Jason Duralo</p>
               </div>
            </div>
            <div className="footer_center">
                 <ShuffleOutlinedIcon  className="footer_green"/>
                <SkipPreviousOutlinedIcon onClick={skipNext}  className="footer_icon"/>
                <IconButton>
                {playing ? (
                <PauseCircleOutlineIcon
                  onClick={handlePlayPause}
                  fontSize="large"
                  className="footer_icon"
                />
            ) : (
                <PlayCircleFilledWhiteOutlinedIcon
                  onClick={handlePlayPause}
                  fontSize="large"
                  className="footer_icon"
                />
            )}   
                 </IconButton>
                <SkipNextOutlinedIcon onClick={skipPrevious} className="footer_icon"/>
                <RepeatOutlinedIcon className="footer_green"/>
            </div>
            <div className="footer_right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon/>
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon/>
                    </Grid>
                    <Grid item xs>
                        <Slider/>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}

export default Footer
