import React from "react";
import { Grid, Col,  } from "@mantine/core";
import { PlayerList } from "./PlayerList";
import { PlayersBar } from "./PlayersBar";
import {useMediaQuery } from '@mantine/hooks'


const data = [

    {
      "playerName": "store5642_95301",
      "id": "640d5f807e37b79561292f32",
      "playlist": "default",
      "tags": "c-store"
    },
    {
        "playerName": "store5642_95301",
        "id": "640d5f807e37b79564292f32",
        "playlist": "default",
        "tags": "c-store"
      },
      {
        "playerName": "store5642_95301",
        "id": "640d5f807e37b79561392f34",
        "playlist": "default",
        "tags": "c-store"
      },
      {
        "playerName": "store5642_95301",
        "id": "640d5f807e37b79561294f34",
        "playlist": "default",
        "tags": "c-store"
      },
      {
        "playerName": "store5642_95301",
        "id": "640d5f807e37b79561292f39",
        "playlist": "default",
        "tags": "c-store"
      },
      {
        "playerName": "store5642_95301",
        "id": "640d5f807e37b79564292f24",
        "playlist": "default",
        "tags": "c-store"
      },
      {
        "playerName": "store5642_95301",
        "id": "640d5f807e37b79561222f54",
        "playlist": "default",
        "tags": "c-store"
      },

]
  

function PlayersPage(){


    return(
        <>
        <PlayersBar/>
        <PlayerList data={data}/>
        </>
    )
}


export {PlayersPage}