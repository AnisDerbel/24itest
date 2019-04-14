import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid'

const Header = ({ classes, isSearch }) => (
  <Grid container style={{ flexDirection:'row', justifyContent:'space-between'}}>
    <Link to="/">
      <Grid>
        <Typography variant='h4' className={classes.typography}>
          24/i Test
        </Typography>
      </Grid>
    </Link>
    {
      isSearch &&
        <Link to="/search">
          <Fab color='secondary' aria-label="Close" className={classes.fab}>
            <SearchIcon />
          </Fab>
        </Link>
    }
  </Grid>
)


const styles = theme => ({
  typography:{
    margin: 30,
    textAlign:'left',
    fontWeight: 'bold',
    color:'#fff'
  },
  fab: {
    margin: theme.spacing.unit * 3,
  },
});

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isSearch: PropTypes.bool
};

export default withStyles(styles)(Header);