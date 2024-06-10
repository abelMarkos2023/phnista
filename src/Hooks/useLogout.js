import {useSignOut} from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'
import useToast from './useToast'
import useAuthStore from '../Store/authStore'
const useLogout = () => {
  const {showToast} = useToast()
    //const {signOut,error,loading} = useSignOut(auth)
    const [signOut, loading, error] = useSignOut(auth);
    const {logout : LoggingOut} = useAuthStore()

    const logout = async () => {
      try {
        await signOut();
        localStorage.removeItem('userInfo')
        LoggingOut()
        showToast('Success','Logout Successfully','success')
      }
      catch (error) {
        showToast('Error',error.message,'error')
      }
    }

   
  return {error,loading,logout}
}

export default useLogout