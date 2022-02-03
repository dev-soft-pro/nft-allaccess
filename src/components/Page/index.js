import React, { useState, useEffect } from 'react'
import './styles.scss'
import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Page(props) {
  const { checkLocation } = props
  const [isForbidden, setIsForbidden] = useState(false)
  const forbiddenCountries = [
    'Afghanistan',
    'Central African Republic',
    'Democratic Republic of the Congo',
    'Cuba',
    'Guinea-Bissau',
    'Iran',
    'Iraq',
    'North Korean',
    'Libya',
    'Mali',
    'Somalia',
    'South Sudan',
    'Sudan',
    'Syria',
    'Ukraine',
    'Venezuela',
    'Yemen'
  ]
  useEffect(() => {
    const checkProhibitRegion = async () => {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json();
      if (forbiddenCountries.findIndex(fc => fc == data.country_name) >= 0)
        setIsForbidden(true)
    }
    if (checkLocation)
      checkProhibitRegion();
  }, [])
  return (
    <div className='page-wrapper'>
      <Header />
      <div className='main-wrapper'>
        {checkLocation && isForbidden ? (
          <p className="present-message">
            You appear to be accessing All Access from a prohibited region. 
            At this time, we are unable to grant access to residents in the following regions: 
            {` ${forbiddenCountries.join(', ')}`}.
          </p>
        ) : (
          props.children
        )}
      </div>
      <Footer />
    </div>
  )
}