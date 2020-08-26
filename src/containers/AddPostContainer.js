import React, { useState, useEffect } from 'react'
import AddPost from '../components/AddPost/AddPost'
import firebase from '../firebaseConfig/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actionAddPost } from '../actions/posts'
import { message } from 'antd'
const storage = firebase.storage()
const AddPostContainer = props => {
    const { authreducer, postsreducer, addPost } = props
    const { profile } = authreducer
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewPhoto, setPreviewPhoto] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])
    const [photoUrls, setPhotoUrls] = useState([])
    const [photoAllUploaded, setPhotoAllUploaded] = useState(false)
    const [newPost, setNewPost] = useState({
        caption: '',
    })

    const [expandAddPost, setExpandAddPost] = useState(false)
    const { success_add, error_add, loading_add } = postsreducer
    useEffect(() => {
        if (photoUrls.length && photoAllUploaded) {
            const newPostWithPhotoUrls = {
                ...newPost,
                author: {
                    avatar: profile.avatar,
                    name: profile.username,
                    authorID: profile.userID,
                },
                photoUrls: photoUrls,
            }
            addPost(newPostWithPhotoUrls)
        }
    }, [photoAllUploaded])

    useEffect(() => {
        if (error_add) {
            message.error({ content: 'An error occured' })
        }
    }, [error_add])
    useEffect(() => {
        if (!loading_add) {
            setFileList([])
            setPhotoAllUploaded(false)
            setNewPost({ caption: '' })
            setExpandAddPost(false)
        }
    }, [loading_add])
    const toggleAddPost = () => {
        setExpandAddPost(!expandAddPost)
    }
    const getBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
    const handleCancel = () => {
        setPreviewVisible(false)
    }

    const onPreviewPhoto = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewPhoto(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        )
    }
    const beforeUpload = file => {
        setFileList({ ...fileList, file })
        return false
    }
    const handleFileListChange = ({ fileList }) => {
        setFileList(fileList)
    }
    const onCaptionChange = e => {
        setNewPost({ ...newPost, caption: e.target.value })
    }
    const onFinish = () => {
        //check if user login?
        if (!profile) {
            message.warning({ content: 'You must log in to post!' })
        } else {
            const imgs = []
            fileList.forEach(file => {
                const storageRef = storage.ref(
                    `/photos/${file.originFileObj.name}`
                )
                storageRef.put(file.originFileObj).then(() => {
                    storageRef.getDownloadURL().then(firebaseUrl => {
                        if (!imgs.includes(firebaseUrl)) {
                            imgs.push(firebaseUrl)
                        }
                        if ((imgs.length == fileList.length) != 0) {
                            setPhotoUrls(imgs)
                            setPhotoAllUploaded(true)
                        }
                    })
                })
            })
        }
    }
    const onFinishFailed = errInfo => {
        console.log(errInfo)
    }
    return (
        <AddPost
            toggleAddPost={toggleAddPost}
            expandAddPost={expandAddPost}
            newPost={newPost}
            loading_add={loading_add}
            onCaptionChange={onCaptionChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            handleCancel={handleCancel}
            onPreviewPhoto={onPreviewPhoto}
            fileList={fileList}
            previewPhoto={previewPhoto}
            previewTitle={previewTitle}
            previewVisible={previewVisible}
            beforeUpload={beforeUpload}
            handleFileListChange={handleFileListChange}
        />
    )
}
AddPostContainer.propTypes = {
    auth: PropTypes.object,
    previewVisible: PropTypes.bool,
    previewPhoto: PropTypes.string,
    previewTitle: PropTypes.string,
    fileList: PropTypes.array,
    photoUrls: PropTypes.array,
    photoAllUploaded: PropTypes.bool,
    newPost: PropTypes.object,
}
const mapStateToProps = state => {
    return {
        authreducer: state.authreducer,
        postsreducer: state.postsreducer,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addPost: newPost => {
            dispatch(actionAddPost(newPost))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPostContainer)
