import { doc, setDoc,collection, query, where, getDocs } from 'firebase/firestore'
import { auth, firestore } from './Firebase.js'
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import useToast from '../Hooks/useToast.jsx'
import {useNavigate} from 'react-router-dom'
import useAuthStore from '../Store/authStore.js'
const useSignupWithEmailAndPassword = () => {

    const userCollec = collection(firestore,'users')
    const {login} = useAuthStore()
    const navigate = useNavigate()
    const [createUserWithEmailAndPassword,user,loading,error] = useCreateUserWithEmailAndPassword(auth)

    const {showToast} = useToast()
    const signup = async (inputs) => {
        const {email,password,fullName,userName} = inputs;
        if(!email || !password || !userName || !fullName)
        {
            console.log(email,password,fullName,userName)
            showToast('Error','Please FIll All The Field','error')
            return;
        }

        const checkUser =  query(userCollec,where('userName','==',userName));

        const resultSnapshot = await getDocs(checkUser)

        if(!resultSnapshot.empty){
            showToast('Error','User Name Already Exist','error')
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password);

            if(!newUser || error){
                showToast('Error',error.message,'error')
                return;
            }
            if(newUser){
                const userDoc = {
                    uid:newUser.user.uid,
                    userName:inputs.userName,
                    fullName:inputs.fullName,
                    email:inputs.email,
                    bio:"",
                    profilePic:"",
                    posts:[],
                    followers:[],
                    following:[],
                    createdAt:Date.now()
                }

                const user = await setDoc(doc(firestore,'users',newUser.user.uid),userDoc)
                localStorage.setItem('userInfo',JSON.stringify(newUser))
                navigate('/')
               login(user)
            }
        } catch (error) {
            
        }

    }
  return {loading,error,signup}
}

export default useSignupWithEmailAndPassword