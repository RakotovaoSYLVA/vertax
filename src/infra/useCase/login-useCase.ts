import { useDispatch, useSelector } from "react-redux"
import { setCredentials, clearCredentials, type RootState } from "../../store/redux-store"

interface LoginCredentials {
  username: string
  password: string
}

export function useLoginRedux() {
  const dispatch = useDispatch()
  const loginState = useSelector((state: RootState) => state.login)

  const loginWithRedux = (credentials: LoginCredentials) => {
    dispatch(setCredentials(credentials))
    console.log("Redux: Credentials stored", credentials)
  }

  const clearLogin = () => {
    dispatch(clearCredentials())
  }

  return {
    loginWithRedux,
    clearLogin,
    loginState,
  }
}
