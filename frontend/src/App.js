import styles from './App.module.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route path='/' exact element={
              <div className={styles.home}>
                <Home />
              </div>
              } />
            <Route path='/about' element={<h1>About</h1>} />
            <Route path='/contact' element={<h1>Contact</h1>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
