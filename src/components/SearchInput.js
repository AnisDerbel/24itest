import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

 const SearchInput = ({ classes, onChange, query }) => {
  return(
    <Grid className={classes.container}>
      <TextField
        fullWidth
        autoFocus
        id="outlined-name"
        label="Search"
        InputProps={{
          classes: {
              notchedOutline: classes.notchedOutline,
              input: classes.multilineColor
          }
        }}
        InputLabelProps={{
          style: { color: '#fff' },
          shrink: true,
        }}
        placeholder={' Search movies and tv'}
        className={classes.textField}
        onChange={(e)=>  onChange(e.target.value)}
        value={ query || '' }
        margin="normal"
        variant="outlined"
      />
    </Grid>
  )
}
const styles = ({
  container: {
    margin: 30
  },
  multilineColor:{
    color: '#fff',
    labelColor:'#fff'
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#f50057 !important"
  }
});

SearchInput.prototype = {
  onChange: PropTypes.func.isRequired,
  query: PropTypes.string
}
export default withStyles(styles)(SearchInput);
