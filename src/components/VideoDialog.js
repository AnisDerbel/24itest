import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import shaka from 'shaka-player'

// I have tried to play this video that is required in the test but I got errors so I tried with another stream url
// const manifestUri = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';

// showing video from google api
const manifestUri = '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';


function VideoDialog(props) {
  const videoRef = useRef(null);
  const { classes, poster, title } = props;

  useEffect(()=>{
    const initPlayer = () => {
      var player = new shaka.Player(videoRef.current);
  
      // Listen for error events.
      player.addEventListener('error', onErrorEvent);
  
      // Try to load a manifest.
      // This is an asynchronous process.
      player.load(manifestUri).then(function() {
      	// This runs if the asynchronous load is successful.
      	//The video has now been loaded!
      }).catch(onError);  // onError is executed if the asynchronous load fails.
    }
    shaka.polyfill.installAll();
		// Check to see if the browser supports the basic APIs Shaka needs.
		if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    setTimeout(()=>{
      initPlayer();
    },500)
		} else {
			// This browser does not have the minimum set of APIs we need.
      alert('Browser not supported!')
    }
    
    const onErrorEvent = (event) => {
      // Extract the shaka.util.Error object from the event.
      onError(event.detail);
    }
    
    const onError = (error) => {
      // Log the error.
      console.error('Error code', error.code, 'object', error);
    }
  },[])


  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Dialog
            fullScreen
            open={true}
          >
          <Typography variant='h6' className={classes.typography} style={{ textAlign:'left'}}>
            { title }
          </Typography>
          <video ref= { videoRef }
            width="100%"
            height="100%"
            poster={ poster }
            controls autoPlay>
          </video>
          <Fab onClick={props.onClose} color='secondary' aria-label="Close" className={classes.fab}>
            <CloseIcon />
          </Fab>
        </Dialog>
      </Grid>
    </div>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '5%'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  typography:{
    color: '#000',
    margin: 10
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right:0,
    top:0
  },
});


VideoDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(VideoDialog);