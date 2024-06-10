import React, { useRef, useState } from 'react'
import {Box,Image,Link,Flex,Tooltip,Avatar,Button,Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Heading,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    useColorModeValue,
    CloseButton,
    Stack,Textarea} from "@chakra-ui/react"
import {Link as RouterLink} from 'react-router-dom'
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/constants'
import { BsImageFill } from 'react-icons/bs'
import usePreviewImage from '../../Hooks/usePreviewImage'
import useCreatePost from '../../Hooks/useCreatePost'

const CreatePostComp = () => {
    const {isOpen,onOpen,onClose} = useDisclosure()
    const [caption,setCaption] = useState('')
    const {handleFileSelection,selectedFile,setSelectedFile} = usePreviewImage()
    const {loading,createNewPost} = useCreatePost()
    const imageRef = useRef(null)
    const handleModal = () => {
        onOpen()
        console.log('opeening modal')
    }

    const handlePost = async () => {
        console.log('posting')
        const inputs = {
            caption,
            image:selectedFile
        }
       await createNewPost(inputs)
       onClose()
       setSelectedFile(null)
       setCaption('')

    }
  return (
   <>
    <Tooltip
                    hasArrow
                    placement='right'
                    label={'Search'}
                    
                    openDelay={400}
                    display={{base:"block",md:"none"}}
                    >
                        <Link
                        display={'flex'}
                        alignItems={'center'}
                        gap={4}
                        _hover={{
                            bgColor:"whiteAlpha.300",

                        }}
                        p={2}
                        borderRadius={6}
                        >
                            <CreatePostLogo />
                            <Box display={{base:"none",md:"block"}} onClick = {handleModal}>
                                Create Post
                            </Box>
                        </Link>
                    </Tooltip>

                    <Modal isCentered={true} size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay  bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'/>
        <ModalContent>

        <ModalCloseButton />
        <ModalBody bg={useColorModeValue('gray.50', 'gray.800')}>
       <Flex direction={'column'} p={8} gap={2} >
        <Heading>Create Post</Heading>
       <Textarea placeholder = 'Post ......' onChange={e => setCaption(e.target.value)} value={caption}/>
       <Input type='file' hidden ref={imageRef} onChange={handleFileSelection}/>
       <BsImageFill size={16} style={{marginTop:"12",marginBottom:"12",marginLeft:"10",cursor:"pointer"}} onClick={() => imageRef.current.click()}/>
       {
        selectedFile && (
            <Box my={4} position={'relative'}>
                <Image src = {selectedFile}/>
                <CloseButton 
                position='absolute'
                top={2}
                right={2}
                onClick={() => setSelectedFile(null)}
                />
            </Box>
        )
       }
       <Button onClick={handlePost} isLoading={loading} bgColor={'blue.500'} _hover={{bgColor:"blue.600"}} color={'white'}>Post</Button>
       </Flex>
</ModalBody>
</ModalContent>
</Modal>
   </>
  )
}

export default CreatePostComp