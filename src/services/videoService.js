import Config from './config'
import axios from './axios';
export function getMovieCollections(){
  const urls = [
    Config.POPULAR_MOVIES_URL,
    Config.POPULAR_TV_URL,
    Config.FAMILY_URL,
    Config.DOCUMENTARY_URL
  ];

  const allRequests = urls.map(url => 
    axios.get(url).then(response => response).catch(error => error)
  );

  return Promise.all(allRequests);
};

export function getAssetDetails(type,id){
  return axios.get(Config.ASSET_DETAILS_URL(type,id)).then(response => response).catch(error => error)
}

export function searchMovieCollections(query){
  return axios.get(Config.SEARCH_URL(query)).then(response => response).catch(error => error)
}