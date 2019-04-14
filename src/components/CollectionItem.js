import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import VideoItem from './VideoItem'

const CollectionItem = (({collectionHeader, collectionContent,multilines, onClick, classes})=>(
  <Grid className={classes.root}>
    <Typography variant='h5' className={classes.typography}>
      { collectionHeader.title }
    </Typography>
    <GridList className={classes.gridList} style={{ flexWrap: multilines ? 'wrap' : 'nowrap' }}>
      {
        collectionContent && collectionContent.map((item)=>(
          <VideoItem
            key={ item.id }
            contentId = { item.id }
            contentType={ collectionHeader.media_type || item.media_type }
            title={item.title || item.name}
            image={item.poster_path}
            onClick={ onClick }
          />
        ))
      }
    </GridList>
  </Grid>
))

const styles = ({
  root: {
    marginLeft: 30,
    marginRight: 30,
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  typography:{
    marginTop: 30,
    marginBottom: 30,
    textAlign:'left',
    color:'#fff'
  }
});

CollectionItem.propTypes = {
  classes: PropTypes.object.isRequired,
  collectionHeader: PropTypes.object.isRequired,
  collectionContent: PropTypes.array.isRequired
};

export default withStyles(styles)(CollectionItem);