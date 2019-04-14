import React, { useEffect, useState } from 'react';
import Config from '../services/config'
import useReactRouter from 'use-react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import VideoDialog from '../components/VideoDialog'
import Error from '../components/Error'
import { getAssetDetails } from '../services/videoService';
import LinearProgress from '@material-ui/core/LinearProgress';

function AssetDetail(props) {

  const { match } = useReactRouter();
  const [data,setData] = useState({})
  const [isFetching,setIsFetching] = useState(true)
  const [isError,setIsError] = useState(false)
  const [ play, setPlay] = useState(false)
  const { classes } = props;

  useEffect(() => {
    const { type, id } = match.params
    getAssetDetails(type,id)

    async function fetchAssetDetails() {
      const response = await getAssetDetails(type,id);
      setIsFetching(false)
      if(response.data)
        setData(response.data)
      else
        setIsError(true)
    }
    setIsFetching(true)
    fetchAssetDetails();
  },[])


  if(isFetching){
    return (
      <LinearProgress color="secondary" />
    )
  }
  if(isError){
    return (
      <Error/>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs >
          <Typography variant='h4' className={classes.typography}>
            { data.title || data.name}
          </Typography>
          <Typography variant='h6' className={classes.typography} style={{ textAlign:'left'}}>
            { data.overview}
          </Typography>
          <Typography variant='subtitle1' className={classes.typography} style={{ textAlign:'left'}}>
            - { data.vote_average }/10
          </Typography>
          <Typography variant='subtitle1' className={classes.typography} style={{ textAlign:'left'}}>
            - { data.release_date || data.first_air_date}
          </Typography>
          <Button onClick={()=> setPlay(true) } variant="contained" color='secondary' className={classes.button}>
            Play
          </Button>
        </Grid>
        <Grid item xs>
          <img src={ data.poster_path ? Config.IMAGE_BASE_URL+ data.poster_path : require('../images/thumbnail.png') } alt={ data.title || data.name}/>
        </Grid>
      </Grid>
      {
        play && 
        <VideoDialog
          poster={ Config.IMAGE_BASE_URL+ data.poster_path }
          title = { data.title || data.name}
          onClose ={()=> setPlay(false)}
        />
      }
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
    color: '#fff',
    marginTop: 10
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
});


AssetDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssetDetail);