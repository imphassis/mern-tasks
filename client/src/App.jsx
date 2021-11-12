import { BrowserRouter as Router, Route } from 'react-router-dom';

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
          <Route path="/" exact component={Login} />
          <Route path="/tasks" component={Home} />
          <Route path="/note/:id" component={Task} />
        </div>
      </div>
    </Router>
  );
}

export default App;
