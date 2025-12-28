import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}
