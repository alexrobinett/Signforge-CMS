import { createStyles, Table, ScrollArea, rem, Paper, Card, Text, Group, Container, Loader } from '@mantine/core';
import { useListState } from '@mantine/hooks';;
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';



function NewMessageCreator() {
  const [state, handlers] = useListState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  return (
    <Card mt={20} shadow="xs" mx="md" p="xs">
        New Message Creator
    </Card>
  )

}

export{NewMessageCreator}