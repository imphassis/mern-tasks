import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import './App.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Task from './pages/Task';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/note/:id" component={Task} />
        </div>
      </div>
    </Router>
  );
}

export default App;
