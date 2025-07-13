import {
  Paper,
  Button,
  Group,
  Select,
} from '@mantine/core';
import { usePlayers } from '../../app/features/players/playersApi';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState, useEffect } from 'react';

function MessageToolBar({
  handlePlayerUpdate,
  handleNewMessageButton,
  newMessagePage,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [dropDownValue, setDropDownValue] = useState([]);
  const { data: players, isLoading } = usePlayers();

  const isMobile = useMediaQuery('(max-width: 568px)');

  // Derive dropdown data directly from players
  const dropDownData = players
    ? players.map((player) => ({
        value: `${player.id}`,
        label: `${player.playerName}`,
      }))
    : [];

  useEffect(() => {
    const selectedLabel = dropDownData.find(
      (item) => item.value === String(dropDownValue)
    )?.label;
    handlePlayerUpdate(dropDownValue, selectedLabel);
  }, [dropDownValue, dropDownData, handlePlayerUpdate]);

  const messageTypes = [{ value: 'c-store', label: 'C Store Message' }];

  return (
    <>
      <Paper shadow="xs" mx="md" p="xs">
        {newMessagePage === false ? (
          <Group position="apart">
            <Group>
              {/* <Text  fw={500}>Select A Player:</Text> */}
              <Select
                w={isMobile ? 140 : 200}
                data={dropDownData}
                placeholder="Pick A Player to Edit"
                maxDropdownHeight={160}
                searchable
                limit={20}
                value={dropDownValue}
                onChange={(value) => setDropDownValue(value)}
                nothingFound="Nothing found"
                disabled={isLoading}
              />
            </Group>
            <Button onClick={() => handleNewMessageButton()}>
              New Message
            </Button>
          </Group>
        ) : (
          <Group position="apart">
            <Group>
              <Select
                w={200}
                data={dropDownData}
                placeholder="Player"
                maxDropdownHeight={160}
                searchable
                limit={20}
                value={dropDownValue}
                onChange={(value) => setDropDownValue(value)}
                nothingFound="Nothing found"
              />
            </Group>
            {/* <Select
        w={200}
        data={messageTypes}
        placeholder="Message Type"
        maxDropdownHeight={160}
        searchable limit={20}
        nothingFound="Nothing found"
        /> */}
          </Group>
        )}
      </Paper>
    </>
  );
}

export { MessageToolBar };
