import { createStyles, Table, ScrollArea, rem, Paper, Card, Text, Group, Container, Loader } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetPlayerPlaylistQuery,selectAllPlaylist } from '../../app/features/playlist/playlistAPISlice';

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



function MessageList({ playerId, playerName }) {
  const { classes } = useStyles();
  const [state, handlers] = useListState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const {
    data: playlist,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPlayerPlaylistQuery(playerId , { skip: !playerId });

  const playlistMessages = useSelector((state) => selectAllPlaylist(state));

useEffect(()=> {
    console.log(state)
}, [state])

  useEffect(() => {
    if (isSuccess && !messagesLoaded) {
      const messagesArray = Object.values(playlist.entities);
      handlers.setState(messagesArray);
      setMessagesLoaded(true);
    }
  }, [isSuccess, messagesLoaded, playlist, handlers]);

  const items = state.length ? (
    state.map((item, index) => (
        <Draggable key={item._id} index={index}  draggableId={`${item._id}`}>
        {(provided) => (
          <tr className={classes.item} ref={provided.innerRef} {...provided.draggableProps}>
            <td>
              <div className={classes.dragHandle} {...provided.dragHandleProps}>
                <IconGripVertical size="1.05rem" stroke={1.5} />
              </div>
            </td>
            <td style={{ width: rem(80) }}>{item.messageName}</td>
            <td style={{ width: rem(120) }}>{item.messageType}</td>
            {/* <td style={{ width: rem(80) }}>{item.symbol}</td>
            <td>{item.mass}</td> */}
          </tr>
        )}
      </Draggable>
    ))
  ) : (
    <tr>
      <td colSpan={5}> return <Container mt={30}><Group position="center"><Loader size="xl" variant="bars" /></Group></Container></td>
    </tr>
  );

  return (
   
    <Card mt={20} shadow="xs" mx="md" p="xs">
    <Group>
        <Text fz="lg" fw={500}>{`${playerName}`} Playlist</Text>
    </Group>
    <ScrollArea>
  
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
        }
      >
        <Table sx={{ minWidth: rem(420), '& tbody tr td': { borderBottom: 0 } }}>
          <thead>
            <tr>
              <th style={{ width: rem(20) }} />
              <th style={{ width: rem(180) }}>Name</th>
              <th style={{ width: rem(80) }}>Message Type</th>
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
    </Card>
    
  );
}

export{MessageList}