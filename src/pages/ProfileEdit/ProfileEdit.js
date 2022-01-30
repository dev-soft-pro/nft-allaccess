import React, { useContext, useEffect, useState, useRef, useMemo } from 'react'
import './styles.scss'

import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useToast
} from '@chakra-ui/react'
import Page from 'components/Page'
import { Context } from 'Context'
import ProfileImgEmpty from 'assets/images/profile-empty.png';
import * as API from 'constants/api';
import * as OPTIONS from 'services/options';

function ProfileEdit() {
  const { cookies, updateLoadingStatus } = useContext(Context)
  const toast = useToast()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState()

  useEffect(() => {
    if (cookies) {
      setUsername(cookies.userinfo.username)
      setEmail(cookies.userinfo.email)
    }
  }, [cookies])

  const refreshToken = async () => {
    const response = await fetch(API.REFRESH, OPTIONS.POST({
      refresh: cookies.refresh_token
    }))
    const data = await response.json();
    return data.access;
  }

  const updateUsername = async () => {
    updateLoadingStatus(true);
    const token = await refreshToken();
    const response = await fetch(API.UPDATE_USERNAME, OPTIONS.POST_AUTH({
      username: username
    }, token))
    const data = await response.json();
    toast({
      position: 'top',
      title: 'Update Result',
      description: data.result,
      status: 'info',
      duration: 9000,
      isClosable: true,
    })
    updateLoadingStatus(false);
  }

  const updateEmail = async () => {
    updateLoadingStatus(true);
    const token = await refreshToken();
    const response = await fetch(API.UPDATE_EMAIL, OPTIONS.POST_AUTH({
      email: email
    }, token))
    const data = await response.json();
    toast({
      position: 'top',
      title: 'Update Result',
      description: data.result,
      status: 'info',
      duration: 9000,
      isClosable: true,
    })
    updateLoadingStatus(false);
  }

  const updatePassword = async () => {
    updateLoadingStatus(true);
    const token = await refreshToken();
    const response = await fetch(API.UPDATE_PASSWORD, OPTIONS.POST_AUTH({
      password: password
    }, token))
    const data = await response.json();
    toast({
      position: 'top',
      title: 'Update Result',
      description: data.result,
      status: 'info',
      duration: 9000,
      isClosable: true,
    })
    updateLoadingStatus(false);
  }

  const uploadPhoto = async () => {
    updateLoadingStatus(true);
    const formData = new FormData()
    formData.append('image', profileImage)
    const token = await refreshToken();
    const response = await fetch(API.UPDATE_PHOTO, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();
    toast({
      position: 'top',
      title: 'Update Result',
      description: data.result,
      status: 'info',
      duration: 9000,
      isClosable: true,
    })
    updateLoadingStatus(false);
  }

  const inputFile = useRef(null);

  const profileImageObj = useMemo(() => {
    if (profileImage) {
      return URL.createObjectURL(profileImage)
    } else {
      return ProfileImgEmpty;
    }
  }, [profileImage])

  return (
    <Page>
      <div className="profile-edit-container">
        <div className="profile-edit-wrapper">
          <div className="profile-image">
            <img src={profileImageObj} alt="Profile Image" onClick={() => inputFile.current.click()}/>
            {profileImage && (<Button mt={1} onClick={uploadPhoto}>Update Photo</Button>)}
          </div>
          <Input
            type='file'
            ref={inputFile}
            style={{display: 'none'}}
            onChange={(e) => setProfileImage(e.target.files[0])}/>
          <InputGroup size='md' my={2}>
            <Input
              pr='4.5rem'
              type='text'
              placeholder='Enter Username'
              textColor='white'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={updateUsername}>
                Update
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup size='md' my={2}>
            <Input
              pr='4.5rem'
              type='email'
              placeholder='Enter Email'
              textColor='white'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={updateEmail}>
                Update
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup size='md' my={2}>
            <Input
              pr='4.5rem'
              type='password'
              placeholder='Enter Password'
              textColor='white'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={updatePassword}>
                Update
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
    </Page>
  )
}

export default ProfileEdit;