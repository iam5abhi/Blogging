import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '../../components/firebase/index'

const Navbar = ({user}) => {
    const pathname = usePathname()
  return (
    <>
       <header className>
            <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" href="/"><h2><img src='/images/mylogo.png' height={60} /><em></em></h2></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className={pathname.endsWith('/') ?"nav-item active":"nav-item"}>
                        <Link end className="nav-link" href="/">Home
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li> 
                    <li className={pathname.startsWith('/about') ?"nav-item active":"nav-item"}>
                        <Link className="nav-link" href="/about">About Us</Link>
                    </li>
                    <li className={pathname.startsWith('/blog') ?"nav-item active":"nav-item"}>
                        <Link className="nav-link" href="/blog">Blog Entries</Link>
                    </li>
                    <li className={pathname.startsWith('/contact') ?"nav-item active":"nav-item"}>
                        <Link className="nav-link" href="/contact">Contact Us</Link>
                    </li>
                    <li className={pathname.startsWith('/login') ?"nav-item active":"nav-item"}>
                        {
                            !user?<Link className="nav-link" href="/login">Login</Link>
                            :<>{user.displayName}<a className="nav-link" onClick={logout}>Logout </a></>
                        } 
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </header> 
    </>
  )
}

export default Navbar