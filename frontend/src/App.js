import styles from './App.module.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Protected from './Components/Protected/Protected';
import Error from './Pages/Error/Error';

function App() {
  const isAuth = false;
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
              path='/blog' 
              exact
              element={
                <Protected isAuth={isAuth}>
                  <h1 className={styles.main}>Blog</h1>
                </Protected>
              } 
            />

            <Route 
              path='/submitBlog' 
              exact
              element={
                <Protected isAuth={isAuth}>
                  <h1 className={styles.main}>Submit a Blog</h1>
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
                <h1 className={styles.main}>Signup Page</h1>
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
