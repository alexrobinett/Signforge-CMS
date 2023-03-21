import {Table, Text, ScrollArea, Loader } from '@mantine/core';


import { selectAllPlayers, useGetPlayersQuery } from '../../app/features/players/playersApiSlice';
import { useSelector } from 'react-redux';
import { useInputState } from '@mantine/hooks';
import { Row } from './row';




function PlayerList( ) {
  const {
    data: players,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch, 
} = useGetPlayersQuery()

const allPlayers = useSelector(selectAllPlayers);

if (isLoading){
  return <Loader size="xl" variant="bars" />;
}

if (isError){
  return <Text>{error?.data?.message}</Text>
}
  
if (isSuccess){

const rows = allPlayers.map((player) => <Row playerName={player.playerName} id={player.id} key={player.id} refetch={refetch}/>)

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 600 }} verticalSpacing="md">
      <thead>
          <tr>
            <th>Player Name</th>
            <th>Player Id</th>
            <th>Tags</th>
            <th>Playlist</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
  }
}

export {PlayerList}