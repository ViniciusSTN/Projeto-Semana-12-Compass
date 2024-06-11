import { BrowserRouter, Route, Routes,  } from "react-router-dom"
import { Home } from "./pages/Home"

import { Footer } from "./components/Footer"
import Header from "./components/Header"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
