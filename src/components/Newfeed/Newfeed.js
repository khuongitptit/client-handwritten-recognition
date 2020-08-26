import React, { useEffect } from 'react'
import Post from '../Post/Post'
import { message } from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import './Newfeed.scss'
const Newfeed = props => {
    const { postsreducer } = props
    const { posts, error_get, loading_get } = postsreducer
    useEffect(() => {
        if (error_get) {
            message.error({ content: 'Error getting posts' })
        }
    }, [error_get])
    const displayPosts = () => {
        if (posts.length !== 0) {
            return posts.map(post => {
                return <Post post={post} />
            })
        } else {
            return <div className='empty-newfeed'>Newfeed is empty!</div>
        }
    }
    return (
        <div className='newfeed'>
            <div className='posts'>{displayPosts()}</div>
            {loading_get && (
                <div className='getting-post'>
                    <Loading3QuartersOutlined spin />
                </div>
            )}
        </div>
    )
}

export default Newfeed
