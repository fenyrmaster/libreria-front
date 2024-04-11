import { BrowserRouter, Routes, Route } from "react-router-dom"
import BookAdminPage from './components/BookAdminPage'
import BookPage from './components/BookPage'
import Cuenta from './components/Cuenta'
import RegistroLogin from './components/RegistroLogin'
import TagsAdmin from "./components/TagsAdmin"
import PrestamosPage from "./components/PrestamosPage"
import RootLayout from './layout/RootLayout'
import UserManagerPage from "./components/UserManagerPage"
import PrestamosAdminPage from "./components/PrestamosAdminPage"
import ConfirmCuenta from "./components/confirmAccount"
import { AuthProvider } from "./context/AuthProvider";
import ResetPassword from "./components/ResetPassword"
import { RightSidebarProvider } from "./context/SidebarProvider" 
import ConfirmMailChange from "./components/confirmMailChange"
import AuditoriasPage from "./components/AuditoriasPage"
import NotFound from "./components/NotFound"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RightSidebarProvider>
          <Routes>
            <Route path="/" element={<RootLayout/>}>
              <Route path='' element={<BookPage/>}/>
              <Route path='libros' element={<BookAdminPage/>}/>
              <Route path='iniciar-sesion' element={<RegistroLogin/>}/>
              <Route path='cuenta' element={<Cuenta/>}/>
              <Route path='etiquetas' element={<TagsAdmin/>}/>
              <Route path='prestamos' element={<PrestamosPage/>}/>
              <Route path='usuarios' element={<UserManagerPage/>}/>
              <Route path='gestion-prestamos' element={<PrestamosAdminPage/>}/>
              <Route path='confirmarCuenta/:codigo' element={<ConfirmCuenta/>}/>
              <Route path='correoCambiado/:codigo' element={<ConfirmMailChange/>}/>
              <Route path='recuperar/:codigo' element={<ResetPassword/>}/>
              <Route path="auditorias" element={<AuditoriasPage/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </RightSidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
