import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import SingUp from './Pages/SingUp/SingUp'
import SighIn from './Pages/SingIn/SighIn'
import Home from './Pages/Home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/singup' element={<SingUp/>}/>
          <Route path='/login' element={<SighIn/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
