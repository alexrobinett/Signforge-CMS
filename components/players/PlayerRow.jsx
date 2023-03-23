import React from "react"
import { Group, Text, ActionIcon, Menu, Badge,Indicator, TextInput, Button } from '@mantine/core';
import {
    IconPencil,
    IconMessages,
    IconTrash,
    IconDots,
    IconCast,
  } from '@tabler/icons-react';

import { useInputState } from "@mantine/hooks";
import { useState } from 'react';
import { useUpdatePlayerMutation, useDeletePlayerMutation } from "../../app/features/players/playersApiSlice";



function PlayerRow({id, playerName, refetch}){
const [editing, setEditing] = useState(false);
const [editPlayerName, setEditPlayerName] = useInputState(playerName)
const [deletePlayer, {
    isLoading: isDeleteLoading,

}] = useDeletePlayerMutation() 
const [updatePlayer,{
    isLoading: isUpdateLoading,
    isSuccess,
    isError,
    error,
  }] = useUpdatePlayerMutation()




const canUpdate = [editPlayerName]. every (Boolean) && !isUpdateLoading;
 
async function handleUpdateClick(){
    if(canUpdate){
        try{
            await updatePlayer( {"id": id, "playerName": `${editPlayerName}`}).unwrap()
            await refetch()
            setEditing(!editing)
        }catch{
            console.error('failed to update Player Name', err)
        }
    } 
}

async function handleDeleteClick(){
  
        try{
            await deletePlayer({"id": id}), 
            await refetch()
        }catch{
            console.error('failed to delete Player Name', err)
        }

}


return(
    <tr>
      <td>
        <Group spacing="sm" noWrap="true">
        <Indicator color="green" size={8} zIndex={2} >
          <IconCast/>
        </Indicator>
            {editing ? (
            <Group>
                <TextInput 
                    placeholder="Player Name" 
                    size="xs" mr={-40} 
                    value={editPlayerName} 
                    onChange={setEditPlayerName}/> 
                <Button 
                    size="xs" 
                    onClick={() => handleUpdateClick() }>
                    Done</Button>
            </Group>) : ( 

            <Text fz="sm" mr={20} fw={500} truncate="end">
              {playerName}
            </Text>)}
        </Group>
      </td>
      <td>
        <Text fz="xs">{id}</Text>

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
          <ActionIcon onClick={() => setEditing(!editing)}>
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
              <Menu.Item onClick={()=> handleDeleteClick()} icon={<IconTrash size="1rem" stroke={1.5} />} color="red">
                Delete Player
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
    )
};      

export {PlayerRow}