import React, { useEffect, useState } from 'react'
import './styles.scss'
import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Page(props) {
  const [checkingLocation, setCheckingLocation] = useState(false)
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
      setCheckingLocation(false)
    }
    setCheckingLocation(true)
    checkProhibitRegion();
  }, [])

  return (
    <div className='page-wrapper'>
      <Header />
      <div className='main-wrapper'>
      {checkingLocation ? (
        <p className="present-message">
          Checking Location...
        </p>
      ) : (
        isForbidden ? (
          <p className="present-message">
            You appear to be accessing All Access from a prohibited region. 
            At this time, we are unable to grant access to residents in the following regions: 
            Afghanistan, Central African Republic (The)
            , Congo (The Democratic Republic of)
            , Cuba, Guinea-Bissau
            , Iran (Islamic Republic of)
            , Iraq, Korea (The Democratic People's Republic of)
            , Libya, Mali
            , Somalia
            , South Sudan
            , Sudan (The)
            , Syrian Arab Republic
            , Ukraine
            , Venezuela (Bolivarian Republic of)
            , Yemen.
          </p>
        ) : (
          props.children
        )
      )}
      </div>
      <Footer />
    </div>
  )
}