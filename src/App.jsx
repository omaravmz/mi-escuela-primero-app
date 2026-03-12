import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Form from './pages/form'
import Catalog from './pages/catalog'
import Admin from './pages/admin'
import ProjectDetail from './pages/ProjectDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/donar" element={<Form />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/proyecto/:id" element={<ProjectDetail />} />
    </Routes>
  )
}

export default App