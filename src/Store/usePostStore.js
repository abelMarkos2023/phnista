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
    addComment: (comment, id) => set(state => {
        const updatedPosts = state.posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    comments: [...post.comments, comment]
                };
            }
            return post;
        });
        return { posts: updatedPosts };
    }),
    
    toggleLike: (postId, userId) => set(state => {
        const updatedPosts = state.posts.map(post => {
            if (post.id === postId) {
                const updatedLikes = post.likes.includes(userId)
                    ? post.likes.filter(like => like !== userId)
                    : [...post.likes, userId];
                return {
                    ...post,
                    likes: updatedLikes
                };
            }
            return post;
        });
        return { posts: updatedPosts };
    }),
    
    
}))