import { BrowserRouter, Route, Routes,  } from "react-router-dom"
import { Home } from "./pages/Home"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
