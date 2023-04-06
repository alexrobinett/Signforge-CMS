import {store} from '../../app/store'
import { messageApiSlice } from '../../app/features/message/messagesApiSlice'
import { imageApiSlice } from '../../app/features/images/imagesAPI'
import { playerApiSlice } from '../../app/features/players/playersApiSlice'
import { userApiSlice } from '../../app/features/users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function Prefetch(){

    
  const { userID } = useAuth();
    
    useEffect(() => {
        const images = store.dispatch(imageApiSlice.endpoints.getImages.initiate())
        const players = store.dispatch(playerApiSlice.endpoints.getPlayers.initiate())
        const messages = store.dispatch(messageApiSlice.endpoints.getMessages.initiate())

        return () => {
            images.unsubscribe()
            players.unsubscribe()
            messages.unsubscribe()
        }
    }, [userID])

    return <Outlet />
}

export {Prefetch}