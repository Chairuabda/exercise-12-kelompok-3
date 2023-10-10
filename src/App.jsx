import { Home } from "./pages/Home/index"
import { Login } from "./pages/Login/index"
import { Register } from "./pages/Register/index"
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  )
}

export default App
