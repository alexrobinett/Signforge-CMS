import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "../../app/features/auth/authApiSlice";
import { useSelector, } from "react-redux";
import { selectCurrentToken,} from "../../app/features/auth/authSlice";
import usePersist from "../../hooks/usePersist";
import { Outlet, useNavigate, Link } from "react-router-dom";

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const navigate = useNavigate()

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {


            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response = 
                    await refresh()
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                    navigate('/')
                }
            }

            if (!token && persist) verifyRefreshToken()
    

        return () => effectRan.current = true

    }, [])


    let content
    if (!persist) { // persist: no

        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
    
        content = <p>Loading...</p>
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <p className='errmsg'>
                {error.data?.message}
                <Link to="/">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes

        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes

        content = <Outlet />
    }

    return content
}
export default PersistLogin