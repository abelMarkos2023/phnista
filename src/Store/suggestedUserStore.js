import React from 'react'
import { create } from 'zustand'

const suggestedUserStore = create(set => ({
    suggestedUsers:[],
    setSuggestedUsers: suggestedUsers => set(state => ({
        suggestedUsers:[...suggestedUsers]
    })),
    followUser: (id,type,userId) => set(state => {
        const user = state.suggestedUsers.filter(user => user.uid === id)
        const otherUsers = state.suggestedUsers.filter(user => user.uid !== id)
        
       const newUser =  type !== 'Unfollow' ? user.followers.push(userId) : user.followers.filter(u => u !== userId)
        return {
            suggestedUsers:[...otherUsers,newUser[0]],
            
        }
    })
}))

export default suggestedUserStore