import React,{ useEffect,useState } from 'react'
import useReactRouter from 'use-react-router';
import { getMovieCollections } from '../services/videoService'
import { MOVIES_COLLECTIONS } from '../constants'
import Header from '../components/Header'
import Error from '../components/Error'
import CollectionItem from '../components/CollectionItem'
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

 function Home(props){
  const [data,setData] = useState()
  const { history } = useReactRouter()
  const [isFetching,setIsFetching] = useState(true)
  const [isError,setIsError] = useState(false)
  const { classes } = props;

  const navigateToDetails = (path) => {
    history.push(path)
  }

  useEffect(() => {
    // calling movies and tv apis
    async function fetchMovieCollections() {
      const response = await getMovieCollections();
      setIsFetching(false)
      if(response && response.filter(x =>  !x.data).length === 0)
        setData(response)
      else
        setIsError(true)
    }  
  
    setIsFetching(true)
    fetchMovieCollections();
  }, []);

  // showing loading while fetching
  if(isFetching){
    return (
      <LinearProgress color="secondary" />
    )
  }
  // showing error message if fetching is failing some how
  if(isError){
    return (
      <Error/>
    )
  }

  return(
    <div className={classes.root}>
      <Header isSearch />
      {
        data && MOVIES_COLLECTIONS.map((collection,index)=>(
          <CollectionItem
            key={collection.title}
            collectionHeader = { collection }
            collectionContent = { data[index].data.results }
            onClick={navigateToDetails}
          />
        ))
      }
    </div>
  )
}
const styles = ({
  root: {
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: '#000',
  }
});

export default withStyles(styles)(Home);
