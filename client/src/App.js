import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Theme from './styles/Theme';
import Header from './components/Header';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Accommodation from './pages/Accommodation';
import BiddingList from './pages/BiddingList';
import Preloader from './components/Preloader';
import Footer from './components/Footer';

axios.defaults.withCredentials = true;

function App() {
  const visitedPageState = useSelector((state) => state.visitedPageReducer);
  const { visitedPage } = visitedPageState;
  const [isSignIn, setIsSignIn] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  const getUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/userinfo`);
      const userInfo = res.data;
      if (userInfo) {
        const { id, email, mobile, username, social } = userInfo;
        setUser({ id, email, mobile, username, social });
      } else {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isAuthenticated = () => {
    getUser();
  };

  const handleResponseSuccess = (accessToken) => {
    isAuthenticated();
    // localStorage.setItem('isSignIn', true);
    localStorage.setItem('token', accessToken);
  };

  const handleSignOut = async () => {
    try {
      if (user.social === 'kakao') {
        const accessToken = localStorage.getItem('token');
        const headers = {
          accessToken,
          'Content-Type': 'application/json',
        };
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/oauth/signout`, {}, { headers });
        if (result.status === 205) {
          setUser(null);
          localStorage.clear();
        }
      } else {
        const signOutRequest = await axios.post(`${process.env.REACT_APP_API_URL}/signout`);
        if (signOutRequest.status === 205) {
          setUser(null);
          localStorage.clear();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {}, [visitedPage]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsSignIn(true);
      setUser(user);
    } else {
      setIsSignIn(false);
    }
  }, []);

  useEffect(() => user && localStorage.setItem('user', JSON.stringify(user)), [user]);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header handleSignOut={handleSignOut} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home handleResponseSuccess={handleResponseSuccess} />}
          ></Route>
          <Route
            path="/signin"
            element={<SignIn handleResponseSuccess={handleResponseSuccess} />}
          ></Route>
          <Route path="/signup" element={isSignIn ? <Navigate to="/" /> : <SignUp />}></Route>
          <Route
            path="/userinfo"
            element={user ? <Mypage user={user} setUser={setUser} /> : <Navigate to="/signin" />}
          ></Route>
          <Route
            path="/biddinglist"
            element={user ? <BiddingList user={user} /> : <Navigate to="/signin" />}
          ></Route>
          <Route path="/accommodation/:id" element={<Accommodation />}></Route>
          <Route path="/signout" element={<Navigate to="/" />}></Route>
          <Route path="/preloader" element={<Preloader />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
