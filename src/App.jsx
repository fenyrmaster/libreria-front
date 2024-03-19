import { BrowserRouter, Routes, Route } from "react-router-dom"
import BookAdminPage from './components/BookAdminPage'
import BookPage from './components/BookPage'
import Cuenta from './components/Cuenta'
import RegistroLogin from './components/RegistroLogin'
import TagsAdmin from "./components/TagsAdmin"
import RootLayout from './layout/RootLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route path='' element={<BookPage/>}/>
          <Route path='libros' element={<BookAdminPage/>}/>
          <Route path='iniciar-sesion' element={<RegistroLogin/>}/>
          <Route path='cuenta' element={<Cuenta/>}/>
          <Route path='etiquetas' element={<TagsAdmin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
