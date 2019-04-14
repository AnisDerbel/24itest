import React,{ useState, useEffect } from 'react'
import { writeStorage, deleteFromStorage, useLocalStorage } from '@rehooks/local-storage';

import useReactRouter from 'use-react-router';
import { searchMovieCollections } from '../services/videoService'
import Header from '../components/Header'
import CollectionItem from '../components/CollectionItem'
import SearchInput from '../components/SearchInput'
import Error from '../components/Error'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

 function Search(props){
  const [storageQuery] = useLocalStorage('query')
  const { history } = useReactRouter()
  const [data,setData] = useState()
  const [query,setQuery] = useState()
  const [isFetching,setIsFetching] = useState(false)
  const [isError,setIsError] = useState(false)
  const { classes } = props;

  useEffect(()=>{
    // check for the search local storage to not lose the query value when we hit the back button from the AssetDetail
    if(storageQuery){
      setQuery(storageQuery)
      searchCollections(storageQuery)
      deleteFromStorage('query')
    }
  })
  const navigateToDetails = (path) => {
    //save the search query in the local storage
    writeStorage('query', query)
    history.push(path)
  }
  async function searchCollections(query) {
    setQuery(query)
    if(query){
      setIsFetching(true)
      const response = await searchMovieCollections(query);
      setIsFetching(false)
      if(response.data){
        let results = response.data.results.filter(x=> x.media_type !== 'person')
        setData(results)
      }else{
        setIsError(true)
      }  
    }
  }  

  return(
    <div className={classes.root}>
      <Header />
      <Grid>
        <SearchInput
          onChange={(text)=> searchCollections(text)}
          query = { query }
        />
        {/* showing loader while fetching */}
        {
          isFetching &&  <LinearProgress color="secondary" />
        }
        {/* showing error message if fetching failed some how */}
        {
          !isFetching && isError &&
            <Error/>
        }
        {
          data && data.length > 0 &&
          <Grid>
            <CollectionItem
              key={'search'}
              multilines
              collectionHeader = { {title: 'Search Results'} }
              collectionContent = { data }
              onClick={navigateToDetails}
            />
          </Grid>
        }
        {/* showing no result message if the result is empty */}
        {
          query && data && data.length === 0 && 
          <Grid>
            <Typography variant='h5' className={classes.typography}>
              { `No Result found for "${ query }"` }
            </Typography>
          </Grid>
        }

      </Grid>
    </div>
  )
}
const styles = ({
  root: {
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  typography:{
    margin: 30,
    textAlign:'left',
    color:'#fff'
  }
});

export default withStyles(styles)(Search);
