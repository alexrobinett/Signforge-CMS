import { Button, Menu, Group, ActionIcon, Paper, Text } from '@mantine/core';
import { IconTrash, IconBookmark, IconCalendar, IconChevronDown } from '@tabler/icons-react';


function InfoMessageCard() {

  return (
    <Paper mt={20} shadow="xs" mx="md" p="xs">
        <Group position="apart">
        <Text>Pick a Player to edit the playlist order or create new Message </Text>
        </Group>
    </Paper>
  );
}

export {InfoMessageCard}