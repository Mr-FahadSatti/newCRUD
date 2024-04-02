
import {BrowserRouter, Routes,Route} from'react-router-dom'
import User from './screens/User';
import CreateUser from './screens/CreateUser';
import UpdateUser from './screens/UpdateUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element= {<User/>}></Route>
        <Route path ='/create' element={<CreateUser/>}></Route>
        <Route path ='/update/:id' element={<UpdateUser/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
