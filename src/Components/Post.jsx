import React from 'react'
import {GridItem,Flex,Image,Text,useDisclosure,Modal, ModalOverlay,
ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Box,
    Avatar,
    Divider,
    VStack,
    Button
    } from '@chakra-ui/react'
    import Img1 from '../assets/img1.png'
import Img2 from '../assets/img2.png'
import Img4 from '../assets/img4.png'
import Img3 from '../assets/img3.png'
import { useEffect } from 'react'

import { BiComment, BiHeartCircle, BiShare, BiTrash } from 'react-icons/bi'
import { FiDelete } from 'react-icons/fi'
import Comment from './Comment'
import PostFooter from './PostFooter'
import { useUserProfile } from '../Store/userProfileStore'
import { arrayRemove, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '../Firebase/Firebase'
import { deleteObject, ref } from 'firebase/storage'
import { usePostStore } from '../Store/usePostStore'
import useToast from '../Hooks/useToast'
import useAuthStore from '../Store/authStore'

const Post = ({image,item}) => {
    const {isOpen,onOpen,onClose} = useDisclosure()
    const {userProfile} = useUserProfile()
    const {deletePost,toggleLike} = usePostStore()
    const {showToast} = useToast()
   
    const {user} = useAuthStore()
    const handleDelete = async () => {
       try {
        const postRef = doc(firestore,'posts',item.id)
       const userRef = doc(firestore,'users',userProfile.uid)
       const imageRef = ref(storage,`posts/${item.id}`)
       await updateDoc(userRef,{posts:arrayRemove(item.id)})
       await deleteObject(imageRef)
       await deleteDoc(postRef)
       deletePost(item.id)
       showToast('Success','Post Deleted','success')
       //onClose()
       } catch (error) {
        showToast("Error",error.message,'error')
        console.log(error)
       }
       
    }
  return (
    <>
    
    
    <GridItem border={'1px solid'}
    borderColor={'whiteAlpha.300'}
    overflow={'hidden'}
    position={'relative'}
    borderRadius={2}
    cursor={'pointer'}
    onClick={onOpen}
    >
        <Image w={'full'} h={'300'} objectFit={'cover'} src={image}/>
        <Flex
        opacity={'0'}
        position={'absolute'}
        inset={'0'}
        zIndex={2}
        bgColor={'blackAlpha.700'}
        justify={'space-around'}
        transition={'all 400ms ease-in-out'}
        _hover={{
            opacity:1
        }}
        >
            <Flex w={'full'} h={'full'} alignItems={'center'} justifyContent={'center'} gap={4}>
                <Flex alignItems={'center'} gap={1}>
                <BiHeartCircle />
                <Text fontWeight={'bold'}>{item?.likes.length}</Text>
                </Flex>
                <Flex alignItems={'center'} gap={1}>
                <BiShare />
                <Text fontWeight={'bold'}>4</Text>
                </Flex>
                <Flex alignItems={'center'} gap={1}>
                <BiComment />
                <Text fontWeight={'bold'}>{item?.comments?.length}</Text>
                </Flex>
                
            </Flex>
        </Flex>

    </GridItem>

      <Modal isCentered={true} size={'3xl'} isOpen={isOpen} onClose={onClose} minH={'50vh'} maxH={'90vh'}>
        <ModalOverlay  bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'/>
        <ModalContent>
          
        <ModalCloseButton />
          <ModalBody>
            <Flex gap={2} w={{base:"90%",sm:"70%",md:"full"}} alignItems={'flex-start'} pr={10}>
              <Box
              border={'1px solid'}
              borderColor={'whiteAlpha.300'}
              overflow={'hidden'}
              borderRadius={3}
              flex={1}
            
              display={'flex'}
              
              >
              <Image src={image} w={'full'}/>

              </Box>
            
            <Flex flex={1} flexDir={'column'} display={{base:"none",md:"flex"}} py={1}>
              <Flex alignItems={'flex-start'} gap={2}>
              <Avatar size='sm'  src={userProfile.profilePic}/>
              <Text fontWeight={'bold'} fontSize={15} flex={1}>{userProfile.userName}</Text>
              <Box cursor={'pointer'} _hover={{
                bgColor:"whiteAlpha.300",color:"red"
              }}>
              {user.uid === item.createdBy && <Button onClick={handleDelete}>
                <BiTrash size={20}/>
                </Button>}
              </Box>
              </Flex>
              <Divider mt={2} bg={'gray.500'}/>
              <Flex direction={'column'} gap={2} py={4} w={'full'} maxH={'300px'} overflowY={'auto'}>
                {
                  item?.comments?.length && item.comments.map((comment,index) => (
                    (
                      <Comment key={`${comment.createdBy}-${index}`} comment={comment} name={'abel'} />
  
                    )
  
                  ))                }
                   
              </Flex >
              <Divider mt={2} bg={'gray.800'}/>
             
             <PostFooter  isComment={true} id={item.id} item={item}/>
              
            </Flex>
           
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    
    </>
  )
}

export default Post