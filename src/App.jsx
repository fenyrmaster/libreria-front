import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BookPage from './components/BookPage'
import RootLayout from './layout/RootLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route path='' element={<BookPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
