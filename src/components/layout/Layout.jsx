import React from 'react'
import Header from "./header/Header"
import Content from './content/Content'
import Footer from "./footer/Footer"

const Layout = () => {
    return (
        <div className="Layout">
            <Header />
            <Content />
            <Footer />
        </div>
    )
}

export default Layout
