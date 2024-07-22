import styles from './App.module.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/login';
import Signup from './Pages/Signup/Signup';
import Blog from './Pages/BLog/Blog';
import SubmitBlog from './Pages/SubmitBlog/SubmitBlog';
import BlogDetails from './Pages/BlogDetails/BlogDetails';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Protected from './Components/Protected/Protected';
import Error from './Pages/Error/Error';
import { useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector((state) => state.user.auth);
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route 
              path='/' 
              exact 
              element={
                <div className={styles.main}>
                  <Home />
                </div>
              } 
            />
            <Route 
              path="/blog"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <h1 className={styles.main}><Blog /></h1>
                </Protected>
              } 
            />
            
            <Route 
              path="/blog/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <h1 className={styles.main}><BlogDetails /></h1>
                </Protected>
              } 
            />

            <Route 
              path='/submitBlog' 
              exact
              element={
                <Protected isAuth={isAuth}>
                  <h1 className={styles.main}><SubmitBlog /></h1>
                </Protected>
              }
            />

            <Route 
              path='/contact' 
              exact
              element={
                <h1 className={styles.main}>Contact</h1>
              }
            />

            <Route 
              path='/login' 
              exact
              element={
                <div className={styles.main}>
                  <Login />
                </div>
              }
            />

            <Route 
              path='/signup' 
              exact
              element={
                <div className={styles.main}>
                  <Signup />
                </div>
              }
            />

            <Route
              path='*'
              element={
                <div className={styles.main}>
                  <Error />
                </div>
              }
            />

          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
