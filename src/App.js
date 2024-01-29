
import './App.css';
import { Routes,Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import EditPage from './EditPage'
import UserDetailsPage from './UserDetailsPage';

function App() {
  console.log("hi")
  return (
    <div className="App">
     <Routes>
      <Route path='/'>
      <Route index element={<LoginPage/>}/> 
      <Route path='/userDetailPage' element={<UserDetailsPage/>}/>
      <Route path='/signup' >
           <Route index element={<SignupPage/>} />
      </Route>
      <Route path='/edit' element ={<EditPage/>} />

      </Route>
     </Routes>
    </div>
  );
}

export default App;
