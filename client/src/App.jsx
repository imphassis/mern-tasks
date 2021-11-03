import React from 'react';

// We use Route in order to define the different routes of our application
import { Route, Switch } from 'react-router-dom';

// We import all the components we need in our app

import Login from './pages/Login';
import TaskViewer from './pages/TaskViewer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <Route
          exact
          path="/tarefas"
          render={(props) => <TaskViewer {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

export default App;
