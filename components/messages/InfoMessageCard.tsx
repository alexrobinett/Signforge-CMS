import React from 'react';
import {
  Group,
  Paper,
  Text
} from '@mantine/core';

function InfoMessageCard() {
  return (
    <Paper mt={20} shadow="xs" mx="md" p="xs">
      <Group position="apart">
        <Text>
          Pick a Player to edit the playlist order or create new Message
        </Text>
      </Group>
    </Paper>
  );
}

export { InfoMessageCard };
