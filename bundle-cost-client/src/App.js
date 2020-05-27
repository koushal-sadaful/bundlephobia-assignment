import React from 'react';
import {Route, Link} from 'react-router-dom'
import LandingPage from './components/SearchPage'
import PackageStats from './components/PackageStats'

function App() {
    return (
        <div>
          <main>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/packageStats/:packageName" component={PackageStats}/>
                <Route exact path="/packageStats/:packageName/:version" component={PackageStats}/>
            </main>
        </div>
    );
}

export default App;
