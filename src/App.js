import React from 'react';
import './App.css';
import GameList from './components/game-list';
import GameView from './components/game-view';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route path={'/'} exact component={GameList} />
                    <Route path={'/view/:id'} component={GameView} />
                </Switch>
            </Router>
        )
    }
}

export default App;
