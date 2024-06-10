import {create} from 'zustand'

export const usePostStore = create(set => ({
    posts :[],
    setPosts : post => set(state => ({
        posts:[...post]
    })),
    setPost: post => set(state => ({
        posts:[...state.posts,post]
    })),
    deletePost : id => set(state => ({
        posts: state.posts.filter(post => post.id !== id)
    })),
    addComment : (comment,id) => set(state => {
        const selectedPost = state?.posts?.filter(p => p.id == id)
        const otherPost = state.posts.filter(p => p.id != id)
        selectedPost[0]?.comments?.push(comment)
        return {
            posts: [...otherPost,selectedPost[0]]
        }
 
    }),
    toggleLike : (postId,userId) => set(state => {
        const selectedPost = state?.posts?.find(post => post.id == postId)
        const otherPost = state.posts.filter(post => post.id!= postId)

        if(selectedPost[0]?.likes.includes(userId)){
            selectedPost[0]?.likes = selectedPost[0]?.likes?.filter(like => like != userId)
        }
        else{
            selectedPost[0]?.likes?.push(userId)
        }
        return {
            posts: [...otherPost,selectedPost[0]]
        }
    })
    
}))