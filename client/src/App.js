import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './App.less';

import { setUser, logout } from './redux/actions/auth';

import store from './redux/store';
import setAuthToken from './utils/setAuthToken';

import Header from './components/layouts/header';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Posts from './components/posts/Posts';

// Check for token
if (localStorage.token) {
  // Set auth token header auth
  setAuthToken(localStorage.token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.token);
  // Set user and isAuthenticated
  store.dispatch(setUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logout());
    // Redirect to login
    window.location.href = "/signin";
  }
}

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
              <Route path='/posts' element={<Posts />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
