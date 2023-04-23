import React from "react"
import { Group, Text, ActionIcon, Menu, Badge,Indicator, TextInput, Button,  } from '@mantine/core';
import {
    IconPencil,
    IconMessages,
    IconTrash,
    IconDots,
    IconCast,
    IconArrowRight,
    IconCheck
  } from '@tabler/icons-react';

import { useInputState, useMediaQuery } from "@mantine/hooks";
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
  const isMobile = useMediaQuery('(max-width: 568px)');




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

// sx={ isMobile ? { minWidth: 300 } : { minWidth: 500 } }

return(
    <tr>
      <td>
        <Group spacing="sm" noWrap="true">
        {isMobile ? null : (
          <Indicator color="green" size={8} zIndex={2} >
          <IconCast/>
        </Indicator>
        )}
        
            {editing ? (
            <Group noWrap>
                <TextInput 
                    placeholder="Player Name" 
                    size="xs"
                    value={editPlayerName} 
                    onChange={setEditPlayerName}
                    rightSection={
                      <ActionIcon size={30} variant="filled" color="blue">
                        <IconCheck size="1.1rem" stroke={1.5} onClick={() => handleUpdateClick()}/>
                      </ActionIcon>
                    }
                    /> 
        
            </Group>) : ( 

            <Text fz={isMobile ? 12 : "sm"} mr={20} fw={500} truncate="end">
              {playerName}
            </Text>)}
        </Group>
      </td>
      <td>
        <Text fz={isMobile ? 8 : "sm"}  truncate="end">{id}</Text>

      </td>
      {isMobile ? null : (<> <td>
         <Badge size="xs" variant="outline">Default</Badge>
      </td>
      <td>
        <Text fz="xs">Standard</Text>
      </td>
      </>)}
      
      
     
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