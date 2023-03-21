import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Badge,Indicator, Loader } from '@mantine/core';
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
  IconCast,
} from '@tabler/icons-react';

import { selectAllPlayers, useGetPlayersQuery } from '../../app/features/players/playersApiSlice';
import { useSelector } from 'react-redux';




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

  const rows = allPlayers.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
        <Indicator color="green" size={8} >
          <IconCast/>
          </Indicator>
          <div>
            <Text fz="sm" fw={500}>
              {item.playerName}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text fz="xs">{item.id}</Text>

      </td>
      <td>
         <Badge size="xs" variant="outline">Default</Badge>
      </td>
      <td>
        <Text fz="xs">Standard</Text>
        {/* {item.playlist}  goes in to replace default once query is update and playlist feature built*/}
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <Menu
            transitionProps={{ transition: 'pop' }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconMessages size="1rem" stroke={1.5} />}>Send message</Menu.Item>
              <Menu.Item icon={<IconNote size="1rem" stroke={1.5} />}>Add note</Menu.Item>
              <Menu.Item icon={<IconTrash size="1rem" stroke={1.5} />} color="red">
                Delete Player
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

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