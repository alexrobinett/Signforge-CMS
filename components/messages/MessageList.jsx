import { createStyles, Table, ScrollArea, rem, Paper, Card, Text, Group, Container, Loader, ActionIcon, Menu, Button } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical, IconPencil, IconDots , IconMessages, IconTrash, IconEdit} from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetPlayerPlaylistQuery,selectAllPlaylist} from '../../app/features/playlist/playlistAPISlice';
import { useUpdateMessagePositionMutation, useDeleteMessageMutation, useUpdateMessageMutation } from '../../app/features/message/messagesApiSlice';

const useStyles = createStyles((theme) => ({
  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    width: rem(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
  },
}));



function MessageList({ playerId, playerName, handleMessageUpdate }) {
  const { classes } = useStyles();
  const [messageState, setMessageState] = useState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const {
    data: playlist,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPlayerPlaylistQuery(playerId , { 
    skip: !playerId,
    pollingInterval: 60000, 
    refetchOnFocus: true,});

  
  const [updateMessagePosition] = useUpdateMessagePositionMutation()



  const [deleteMessage] = useDeleteMessageMutation()

  const playlistMessages = useSelector((messageState) => selectAllPlaylist(messageState));



  async function updatePlaylistMessagePositions(){
    for (let i = 0; i < messageState.length; i++) {
      const message = messageState[i];
      try {
        const response = await updateMessagePosition({
          messageId: message._id,
          position: i,
        });
        refetch()
      } catch (err) {
        console.error(err);
      }
    }
  };



async function handleDeleteClick(id){
  await deleteMessage(id)
  refetch()
}

async function handleEditClick(id){
  handleMessageUpdate(id)
}

  useEffect(() => {
    if (isSuccess) {
      const messagesArray = Object.values(playlist.entities);
      setMessageState(messagesArray);
      setMessagesLoaded(true);
    }
  }, [isSuccess, messagesLoaded, playlist]);
  
  

  const items = messageState.length ? (
    messageState.map((item, index) => (
        <Draggable key={item._id} index={index}  draggableId={`${item._id}`}>
        {(provided) => (
        <tr className={classes.item} ref={provided.innerRef} {...provided.draggableProps}>
            <td>
              <div className={classes.dragHandle} {...provided.dragHandleProps}>
                <IconGripVertical size="1.05rem" stroke={1.5} />
              </div>
            </td>
            <td style={{ width: rem(40) }}>{item.position + 1}</td>
            <td style={{ width: rem(150) }}>{item.messageName}</td>
            <td style={{ width: rem(140) }}>{item.messageType}</td>
            <td>
                <Group spacing={0} position="right">
                  <ActionIcon onClick={() => handleEditClick(item._id)}>
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
                      <Menu.Item onClick={()=> handleDeleteClick(item._id)} icon={<IconTrash size="1rem" stroke={1.5} />} color="red">
                        Delete Player
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
             </td>
             
          </tr>
        )}
      </Draggable>
    ))
  ) : (
    <tr>
      <td colSpan={5}> <Container mt={30}><Group position="center"><Loader size="xl" variant="bars" /></Group></Container></td>
    </tr>
  );


  
  return (
    
   
    <Card mt={20} shadow="xs" mx="md" p="xs">
    <Group>
        <Text fz="lg" fw={500}>{`${playerName}`} Playlist</Text>
    </Group>
    <ScrollArea >
  
      <DragDropContext
       onDragEnd={({ destination, source }) => {
        if (!destination) {
          return;
        }
      
        if (source.index === destination.index) {
          return;
        }
      
        const newState = [...messageState];
        const [removed] = newState.splice(source.index, 1);
        newState.splice(destination.index, 0, removed);
        setMessageState(newState);
      }}
      >
        <Table sx={{ minWidth: rem(420), '& tbody tr td': { borderBottom: 0 } }}>
          <thead>
            <tr>
              <th style={{ width: rem(40) }} />
              <th style={{ width: rem(40) }}>position</th>
              <th style={{ width: rem(150) }}>Name</th>
              <th style={{ width: rem(140) }}>Message Type</th>
              <th style={{ width: rem(140) }}></th>
            </tr>
          </thead>
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {items}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
     
    </ScrollArea>
    <Group position="right"><Button mt={20} onClick={()=> updatePlaylistMessagePositions()}>Update Playlist</Button></Group>
    </Card>
    
  );
}

export{MessageList}