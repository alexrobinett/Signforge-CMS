import {Table, Text, ScrollArea, Loader, Container, Group, Card } from '@mantine/core';


import { selectAllPlayers, useGetPlayersQuery } from '../../app/features/players/playersApiSlice';
import { useSelector } from 'react-redux';
import { useInputState } from '@mantine/hooks';
import { PlayerRow } from './PlayerRow';




function PlayerList( ) {
  const {
    data: players,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch, 
} = useGetPlayersQuery('playerList', {
  pollingInterval: 60000, 
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true})

const allPlayers = useSelector(selectAllPlayers);

if (isLoading){
  return <Container mt={30}><Group position="center"><Loader size="xl" variant="bars" /></Group></Container>;
};

if (isError){
  return <Text>{error?.data?.message}</Text>
}
  
if (isSuccess){

const rows = allPlayers.map((player) => <PlayerRow playerName={player.playerName} id={player.id} key={player.id} refetch={refetch}/>)

  return (
    <ScrollArea>
    <Card mt={20} m={10}>
    
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
   
    </Card>
    </ScrollArea>
  )
  }
}

export {PlayerList}