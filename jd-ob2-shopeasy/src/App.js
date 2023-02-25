import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './components/Dashboard/Home';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart'
import Favs from './components/Favs/Favs'
import Notifications from './components/Notifications/Notifications';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route path='/home' element={<Home />} />
            <Route path='/favs' element={<Favs />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
