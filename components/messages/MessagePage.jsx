import React, { useState } from "react";
import { MessageToolBar } from "./MessageToolBar";
import { MessageList } from "./MessageList";
  


function MessagesPage(){

    const [playerId, setPlayerId] = useState('')

    function handlePlayerUpdate(id){
        setPlayerId(id)
    }

    return(
        <>
        <MessageToolBar handlePlayerUpdate={handlePlayerUpdate}/>
        <MessageList playerId={playerId} />
        </>
    )
}


export {MessagesPage}