import {
  Paper,
  Button,
  Group,
  Select,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
// TODO: Replace with your actual data fetching logic
const getPlayers = async () => {
  // Example fetch, replace URL with your API endpoint
  const response = await fetch('/api/players');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState, useEffect } from 'react';

function MessageToolBar({
  handlePlayerUpdate,
  handleNewMessageButton,
  newMessagePage,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [dropDownValue, setDropDownValue] = useState([]);
  const { data: players, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['players'],
    queryFn: getPlayers,
  });

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
