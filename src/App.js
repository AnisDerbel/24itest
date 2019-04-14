import React from 'react';
import { Route,Switch } from 'react-router'
import { HashRouter } from "react-router-dom";
import Home from './pages/Home'
import Search from './pages/Search'
import AutoGrid from './pages/AssetDetail'
import pink from '@material-ui/core/colors/pink';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const App = () =>  { 
    return (
      <div className="App">
      <MuiThemeProvider theme={ theme }>
        <HashRouter>
          <Switch>
            <Route exact  path='/' component={Home}/>
            <Route exact  path='/search' component={Search}/>
            <Route exact  path='/details/:type/:id' component={AutoGrid}/>
          </Switch>
        </HashRouter>
        </MuiThemeProvider>
      </div>
    );
}

export default App;

const theme = createMuiTheme({
  palette: {
    primary: { main: '#000' },
    secondary: pink
  },
  typography: {
    useNextVariants: true,
  }
});
