import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CardActionArea from '@material-ui/core/CardActionArea';
import Config from '../services/config'

const VideoItem =  (({title, image, contentType, contentId, onClick, classes})=>(
  
    <CardActionArea className={ classes.container}  onClick={() => onClick(`/details/${contentType}/${contentId}`)}>
      <GridListTile className={ classes.containerTile}  key={title+image}>
        <img src={ image ? Config.IMAGE_BASE_URL+ image : require('../images/thumbnail.png') } alt={ title } />
        <GridListTileBar
          title= { title }
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
        />
      </GridListTile>
    </CardActionArea>
))

const styles = ({
  container: {
    width: 150, 
    height: 200,
  },
  containerTile: {
    width: 150, 
    height: 200,
    padding: 5
  },
  title: {
    color: '#fff',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

VideoItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  contentType: PropTypes.string.isRequired,
  contentId: PropTypes.number.isRequired,
};

export default withStyles(styles)(VideoItem);