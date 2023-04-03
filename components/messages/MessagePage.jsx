import React, { useState } from "react";
import { MessageToolBar } from "./MessageToolBar";
import { MessageList } from "./MessageList";
import { InfoMessageCard } from "./InfoMessageCard";
import { Header, Text } from "@mantine/core";
import { NewMessageCreator } from "./NewMessageCreator";
import { current } from "@reduxjs/toolkit";
  


function MessagesPage(){

    const [playerId, setPlayerId] = useState('')
    const [messageId, setMessageId] = useState('')
    const [playerName, setPlayerName] = useState('')
    const [newMessagePage, setNewMessagePage] = useState(false)
    const [messageUpdate, setMessageUpdate] = useState(false)

    function handlePlayerUpdate(id, playerName){
        setPlayerId(id)
        setPlayerName(playerName)
    }

    function handleNewMessagePage(){
        setNewMessagePage(true)
    }

    function handleTrashClick(){
      setNewMessagePage((currentState) => !currentState)
    }

    function handleMessageUpdate(id){
      console.log(id)
      setNewMessagePage((currentState) => !currentState)
      setMessageUpdate((currentState) => !currentState)
      setMessageId(id)
    }

    return(
        <>
  
        <MessageToolBar handlePlayerUpdate={handlePlayerUpdate} handleNewMessageButton={handleNewMessagePage} newMessagePage={newMessagePage} />
        
        {playerId == '' || playerId == undefined &&  newMessagePage === true || newMessagePage === true ? (
           null
      ) : (
        <MessageList playerId={playerId} playerName={playerName}  handleMessageUpdate={handleMessageUpdate}/>
      )}
      {newMessagePage == true ? (
           <NewMessageCreator playerId={playerId} handleTrashClick={handleTrashClick} messageUpdate={messageUpdate} setMessageUpdate={setMessageUpdate} messageId={messageId}/>
      ) : (
        null
      )}
        {newMessagePage == !true && playerId == '' ? (
           <InfoMessageCard/>
      ) : (
        null
      )}
        </>
    )
}


export {MessagesPage}