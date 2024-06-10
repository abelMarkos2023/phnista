import React, { useRef, useState } from 'react'
import {VStack,Flex,Box,Text,InputGroup,Input,InputRightElement,Button,useDisclosure,Modal, ModalOverlay,
    ModalContent,
        ModalHeader,
        ModalCloseButton,
        ModalBody,
       Image,
        Avatar,
        Divider,
       
        } from "@chakra-ui/react"
        import { BiComment, BiHeartCircle, BiShare, BiTrash } from 'react-icons/bi'

import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../assets/constants'
import usePostComment from '../Hooks/usePostComment'
import useLikePost from '../Hooks/useLikePost'
import { useUserProfile } from '../Store/userProfileStore'
import { usePostStore } from '../Store/usePostStore'
import useToast from '../Hooks/useToast'
import useAuthStore from '../Store/authStore'
import { deleteDoc, doc } from 'firebase/firestore'
import { firestore, storage } from '../Firebase/Firebase'
import { deleteObject, ref } from 'firebase/storage'
import useGetUserById from '../Hooks/useGetUserById'
import Comment from './Comment'
 
const PostFooter = ({username, isComment,id,item,isFeed}) => {
  const feed = isFeed ? true : false
    const {likes,liking,isLiked,likePost} = useLikePost(item)

    const {commenting,postComment} = usePostComment()
    const [comment,setComment] = useState('')
    const {isOpen,onOpen,onClose} = useDisclosure()
    
    const {deletePost,toggleLike} = usePostStore()
    const {showToast} = useToast()
    const commentRef = useRef(null)
    const {user} = useAuthStore()
    const {user:owner} = useGetUserById(item?.createdBy)
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

    const handleLike = async () => {
        await likePost()
       // toggleLike(item.id,user.uid)
        
    }
    

    const handleComment = async () => {
        await postComment(item.id,comment,feed)
        setComment('')
    }
    const handleClick = () => {
        if (!isFeed) return

        onOpen()

    }
    
  return (
    <>
    <VStack  gap={2} alignItems={'flex-start'} marginTop={'auto'}>
        <Flex gap={3} alignItems={'center'}>
            <Box cursor='pointer' fontSize={18} onClick={() => commentRef.current.focus()}>
                <CommentLogo />
                </Box>
            <Box cursor='pointer'   p={0} fontSize={18} onClick={handleLike}>
                {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
                </Box>
        </Flex>
        <Text fontWeight='bold'>{likes} likes</Text>
        <Flex alignItems={'center'} gap={2}>
            <Text fontWeight={'600'} fontSize={18} color={'white.200'}>{username}</Text>
            <Text color={'gray.400'}>{item.caption}</Text>
        </Flex>
        {!isComment && <Text onClick={handleClick}>View All {item?.comments.length} comments </Text>}
        <Flex 
        justifyContent={'space-between'}
        w={'full'}
        alignItems={'center'}
        >
            <InputGroup>
                <Input variant={'flushed'}
                 placeholder='Add a Comment ...' 
                 fontSize={'14'}
                 value={comment}
                 onChange = {e => setComment(e.target.value)}
                 ref={commentRef}
                 />
                <InputRightElement>
                    <Button color={'blue.500'} fontSize={'14'}
                    onClick={handleComment}
                    isLoading={commenting}
                     _hover={{
                        bgColor:'transparent',
                        color:"white"
                    }}>
                        Post
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Flex>
    </VStack>

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
      <Image src={item.imageURL} w={'full'}/>

      </Box>
    
    <Flex flex={1} flexDir={'column'} display={{base:"none",md:"flex"}} py={1}>
      <Flex alignItems={'flex-start'} gap={2}>
      <Avatar size='sm'  src={owner?.profilePic}/>
      <Text fontWeight={'bold'} fontSize={15} flex={1}>{owner.userName}</Text>
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
          item?.comments?.length && item?.comments.map((comment,index) => (
            
              <Comment key={`${comment.createdBy}-${index}`} comment={comment} name={'abel'} />

            

          )) }
           
      </Flex >
      <Divider mt={2} bg={'gray.800'}/>
     
     <PostFooter  isComment={true} id={item.id} item={item} isFeed={true}/>
      
    </Flex>
   
    </Flex>
  </ModalBody>
</ModalContent>
</Modal>
</>
  )
}

export default PostFooter