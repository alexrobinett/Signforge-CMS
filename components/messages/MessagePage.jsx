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
        setPlayerId('')
    }


    return(
        <>
  
        <MessageToolBar handlePlayerUpdate={handlePlayerUpdate} handleNewMessageButton={handleNewMessagePage} newMessagePage={newMessagePage} />
        
        {playerId == '' ? (
           null
      ) : (
        <MessageList playerId={playerId} playerName={playerName}/>
      )}
        {newMessagePage === false && playerId == '' ? (
           <InfoMessageCard />
      ) : (
        null
      )}
      {newMessagePage == true ? (
           <NewMessageCreator/>
      ) : (
        null
      )}
        </>
    )
}


export {MessagesPage}