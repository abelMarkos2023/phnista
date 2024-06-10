import React from 'react'
import { create } from 'zustand'

const suggestedUserStore = create(set => ({
    suggestedUsers:[],
    setSuggestedUsers: suggestedUsers => set(state => ({
        suggestedUsers:[...suggestedUsers]
    })),
    followUser: (id,userId,type) => set(state => {
        console.log(state.suggestedUsers)
        const user = state?.suggestedUsers?.filter(user => user?.uid === id)
        const otherUsers = state?.suggestedUsers?.filter(user => user?.uid !== id)

        // const newUser = [];
        // if(type !== 'Unfollow'){
        //     newUser[...user[0]?.followers,userId]
        // }else{
        //     newUser[...user[0]?.followers.filter(u => u!== userId)]
        // }
        
       const newUser =  type !== 'Unfollow' ? user[0]?.followers?.push(userId) : user[0]?.followers?.filter(u => u !== id)
        return {
            suggestedUsers:[...otherUsers,newUser[0]],
            
        }
    })
}))

export default suggestedUserStore