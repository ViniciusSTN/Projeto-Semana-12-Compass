import { useEffect, useState } from "react"

type NavItem = {
  text: string,
  link: string,
}

export default function Header() {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [navBarActive, setNavBarActive] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = document.documentElement.clientWidth

      if (width < 768) {
        setHamburgerActive(true)
      } else {
        setHamburgerActive(false)

        if (navBarActive) setNavBarActive(false)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [navBarActive])

  const listItems: NavItem[] = [{text: 'Home', link: '/'}, {text: 'Shop', link: '/shop'}, {text: 'About', link: '/about'}, {text: 'Contact', link: '/contact'}]

  return (
    <header className="flex justify-center relative z-30">
      <div className="container flex justify-between items-center h-24 px-8 lg:px-14">
        <a href="/" className="flex gap-1">
          <img src="/public/icone-logo.svg" alt="Furniro" />
          <h1 className="font-Montserrat font-bold text-3.5xl">Furniro</h1>
        </a>

        <div className={`w-full bg-black opacity-60 fixed top-0 bottom-0 left-0 z-40 ${navBarActive ? 'visible' : 'invisible'}`} onClick={() => setNavBarActive(false)}></div>
  
        <nav className={`fixed z-50 top-0 -right-64 h-full w-60 flex flex-col items-center gap-10 transition-transform bg-antiquewhite md:block md:static md:w-auto md:h-auto md:bg-opacity-0 ${navBarActive && '-translate-x-64 gap-16 pt-1/8'}`}>
          {
            hamburgerActive && (
              <div className="flex flex-col gap-9">
                <a href="/login" className="font-Poppins font-medium flex flex-col gap-1 items-center">
                  <i><img src="/public/pessoa.svg" alt="login" /></i>
                  Login
                </a>

                <a href="/cart" className="font-Poppins font-medium flex flex-col gap-1 items-center">
                  <i><img src="/public/carrinho.svg" alt="cart" /></i>
                  Itens
                </a>
              </div>
            )
          }

          <ul className="flex flex-col md:flex-row">
            {
              listItems.map((item) => (
                <li key={item.text}>
                  <a href={item.link} className={'font-Poppins font-medium py-5 px-4 lg:px-8 block hover:text-goldenbrown'}>{item.text}</a>
                </li>
              ))
            }
          </ul>
        </nav>

        {
          !hamburgerActive && (
            <div className="flex gap-9">
              <a href="/login"><i><img src="/public/pessoa.svg" alt="login" /></i></a>
              <a href="/cart"><i><img src="/public/carrinho.svg" alt="cart" /></i></a>
            </div>
          )
        }

        {hamburgerActive && (
          <button onClick={() => setNavBarActive(true)}>
            <img src="/public/menu-icon.svg" alt="menu" />
          </button>
        )}
      </div>
    </header>
  )
}

