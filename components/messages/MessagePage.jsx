import React from "react";
import { MessageToolBar } from "./MessageToolBar";
import { MessageList } from "./MessageList";
  

function MessagesPage(){


    return(
        <>
        <MessageToolBar/>
        <MessageList/>
        </>
    )
}


export {MessagesPage}