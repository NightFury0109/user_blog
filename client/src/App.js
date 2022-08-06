import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.less';

import store from './redux/store';

import Header from './components/layouts/header';
import Login from './components/auth/login';
import Register from './components/auth/register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />

          <div className="landing">
            <Routes>
              <Route path='/signin' element={<Login />} />
              <Route path='/signup' element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
