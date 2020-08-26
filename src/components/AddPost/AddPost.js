import React, { useState } from 'react'
import { Button, Form, Upload, Input, Modal } from 'antd'
import { VideoCameraAddOutlined, PlusOutlined } from '@ant-design/icons'
import './AddPost.scss'
const { Item } = Form
const AddPost = props => {
    const { onPreviewImage, handleFileListChange, handleCancel } = props
    const {
        newPost,
        fileList,
        previewVisible,
        previewTitle,
        previewImage,
        beforeUpload,
    } = props
    const { onCaptionChange, onFinish, onFinishFailed, loading_add } = props
    const { toggleAddPost, expandAddPost } = props
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className='ant-upload-text'>Upload</div>
        </div>
    )
    return (
        <div className='add-post'>
            <Button type='primary' onClick={toggleAddPost}>
                <VideoCameraAddOutlined /> Add post
            </Button>
            {expandAddPost && (
                <div className='add-post-controller'>
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className='form'
                    >
                        <Item label='Hình ảnh' name='img' className='img'>
                            <div>
                                <Upload
                                    listType='picture-card'
                                    fileList={fileList}
                                    onPreview={onPreviewImage}
                                    onChange={handleFileListChange}
                                    beforeUpload={beforeUpload}
                                >
                                    {fileList.length >= 5 ? null : uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    title={previewTitle}
                                    footer={null}
                                    onCancel={handleCancel}
                                >
                                    <img
                                        alt='img preview'
                                        style={{ width: '100%' }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </div>
                        </Item>
                        <Item className='caption'>
                            <Input.TextArea
                                onChange={onCaptionChange}
                                value={newPost.caption}
                            />
                        </Item>
                        <Item className='post'>
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={loading_add}
                            >
                                Post
                            </Button>
                        </Item>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default AddPost
