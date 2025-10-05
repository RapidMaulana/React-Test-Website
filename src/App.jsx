import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './styles/App.css'

import HomePage from './pages/Home'
import DetailPage from './pages/DetailPage'
import EditPage from './pages/EditPage'
import AddData from './pages/AddDataPage'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/detail/:id' element={<DetailPage/>}/>
        <Route path='/edit/:transactionId' element={<EditPage/>}/>
        <Route path='/add-data' element={<AddData/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
