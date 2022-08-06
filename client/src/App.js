import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.less';

import { logout, loadUser } from './redux/actions/auth';

import store from './redux/store';
import setAuthToken from './utils/setAuthToken';

import Header from './components/layouts/header';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Landing from './components/layouts/landing';

function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        window.location.href = "/signin";
        store.dispatch(logout());
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />

          <div className="landing">
            <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route path='/signin' element={<Login />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/post/:postId' element={<Post />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
