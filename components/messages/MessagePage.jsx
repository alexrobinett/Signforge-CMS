import React, { useState } from "react";
import { MessageToolBar } from "./MessageToolBar";
import { MessageList } from "./MessageList";
import { InfoMessageCard } from "./InfoMessageCard";
import { Header, Text } from "@mantine/core";
import { NewMessageCreator } from "./NewMessageCreator";
  


function MessagesPage(){

    const [playerId, setPlayerId] = useState('')
    const [playerName, setPlayerName] = useState('')
    const [newMessagePage, setNewMessagePage] = useState(false)

    function handlePlayerUpdate(id, playerName){
        setPlayerId(id)
        setPlayerName(playerName)
    }

    function handleNewMessagePage(){
        setNewMessagePage(true)
    }


    return(
        <>
  
        <MessageToolBar handlePlayerUpdate={handlePlayerUpdate} handleNewMessageButton={handleNewMessagePage} newMessagePage={newMessagePage} />
        
        {playerId == '' || playerId == undefined &&  newMessagePage === true || newMessagePage === true ? (
           null
      ) : (
        <MessageList playerId={playerId} playerName={playerName}/>
      )}
      {newMessagePage == true ? (
           <NewMessageCreator playerId={playerId} />
      ) : (
        null
      )}
        </>
    )
}


export {MessagesPage}