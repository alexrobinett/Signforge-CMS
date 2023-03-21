import React from "react";
import { Grid, Col,  } from "@mantine/core";
import { PlayerList } from "./PlayerList";
import { PlayersBar } from "./PlayersBar";
import {useMediaQuery } from '@mantine/hooks'

  

function PlayersPage(){


    return(
        <>
        <PlayersBar/>
        <PlayerList/>
        </>
    )
}


export {PlayersPage}