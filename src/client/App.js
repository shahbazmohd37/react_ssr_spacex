import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Routes from './Routes';

class App extends React.Component{
  render() {
    return (
      <div>
        <Switch>
            {Routes.map(r => (
              <Route
                {...this.props}
                path={r.path}
                component={withRouter(r.component)}
                key={r.path}
                exact={r.exact}
              />
            ))}
          </Switch>
      </div>
    );
  }
}

export default App;
