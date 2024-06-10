import {create} from 'zustand'


function remove(arr, ele){
    arr.filter(element => element !== ele)
    return arr;
}
export const FeedStore = create(set => ({

        feed:[],
        setFeed: posts => set(state => ({
            feed:[...posts].sort((a,b) => a.createdAt - b.createdAt)
        })),
        addPost : post => set(state => ({
            feed:[post,...state.feed]
        })),
        setComments : (comment,id) => set(state => {
            const post = state.feed.filter(p => p.id === id);
            const otherPosts = state.feed.filter(p => p.id !== id)
            post[0].comments.push(comment)
            return {
                posts:[...otherPosts,post[0]]
            }
        }),
        setLikes: (like,id,userId) => set(state => {
            const post = state.posts.filter(p => p.id === id);
            const otherPosts = state.posts.filter(p => p.id !== id)
    
            post.likes = like ? [...post.likes,userId]: remove(post.likes,userId)
            return {
                posts:[...otherPosts,post].sort((a,b) => a.createdAt - b.createdAt)
            }
        })
    }
    
))