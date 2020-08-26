import React from 'react'
import AddPostContainer from '../../containers/AddPostContainer'
import NewfeedContainer from '../../containers/NewfeedContainer'
const Home = () => {
    return (
        <div className='home-container'>
            <AddPostContainer />
            <NewfeedContainer />
        </div>
    )
}

export default Home
