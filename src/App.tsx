import { BrowserRouter, Route, Routes,  } from "react-router-dom"
import { Home } from "./pages/Home"

import { Footer } from "./components/Others/Footer"
import Header from "./components/Others/Header"
import { Shop } from "./pages/Shop"
import { Cart } from "./pages/Cart"
import { Login } from "./pages/Login"
import { Checkout } from "./pages/Checkout"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
