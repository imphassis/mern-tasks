import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.scss';
import Header from './components/Header';
import Tasks from './pages/Tasks';
import Task from './pages/Task';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Route path="/" exact component={Login} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/note/:id" component={Task} />
        </div>
      </div>
    </Router>
  );
}

export default App;
