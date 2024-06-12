import { BrowserRouter, Route, Routes,  } from "react-router-dom"
import { Home } from "./pages/Home"

import { Footer } from "./components/Others/Footer"
import Header from "./components/Others/Header"
import { Shop } from "./pages/Shop"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
