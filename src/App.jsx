import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Form from './pages/form'
import Catalog from './pages/catalog'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/donar" element={<Form />} />
    </Routes>
  )
}

export default App