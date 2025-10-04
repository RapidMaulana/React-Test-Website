import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './styles/App.css'

import HomePage from './pages/Home'
import DetailPage from './pages/DetailPage'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/detail/:id' element={<DetailPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
