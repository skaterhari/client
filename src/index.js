import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { fetchUsers } from './store/userSlice';

store.dispatch(fetchUsers())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
       <Router>
      <Routes>
        <Route path='/*' element={<App/>}/>
        
      </Routes>
    </Router>
    </Provider>
   
  </React.StrictMode>
);

