import React from 'react'
import './styles.scss'
import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Page(props) {
  return (
    <div className='page-wrapper'>
      <Header />
      <div className='main-wrapper'>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}