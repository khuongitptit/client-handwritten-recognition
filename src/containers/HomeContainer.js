import React, { useEffect } from 'react'
import Home from '../pages/Home/Home'
import aos from 'aos'
import 'aos/dist/aos.css'
const HomeContainer = props => {
    useEffect(() => {
        aos.init({
            duration: 1000,
        })
    }, [])
    return <Home />
}

export default HomeContainer
