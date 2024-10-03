import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './views/IndexPage'
import CategoryPage from './views/CategoryPage'

export default function AppRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} index />
        <Route path='/admincategories' element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}