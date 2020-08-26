import React from 'react'
import './Profile.scss'
const Profile = props => {
    const { profile } = props
    return (
        <div className='profile'>
            <img src={profile.avatar} className='avatar' />
            <p className='username'>{profile.username}</p>
            <p className='name'>{profile.name}</p>
            <p className='bio'>{profile.bio}</p>
        </div>
    )
}

export default Profile
