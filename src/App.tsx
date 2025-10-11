import Home from "./pages/Home"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import ProductPage from "./pages/ProductPage"
ProductPage

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/:id" element={<ProductPage />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
