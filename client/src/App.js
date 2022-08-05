import './App.less';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/layouts/header';

function App() {
  return (
    <Router>
      <Header />
      <div>
        App
      </div>
    </Router>
  );
}

export default App;
