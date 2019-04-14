import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';


const Error = ({ classes }) => (
  <Typography variant='h4' className={classes.typography}>
    {' Something Went wrong, please try again!'}    
  </Typography>    
)

const styles =  ({
  typography:{
    margin: 30,
    fontWeight: 'bold',
    color:'#fff'
  }
});

export default withStyles(styles)(Error);