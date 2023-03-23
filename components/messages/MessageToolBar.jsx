import { Paper, Button,  Modal, Group, Pagination, Autocomplete, MultiSelect, Container, Loader, Text} from '@mantine/core';
import { useGetPlayersQuery, selectAllPlayers } from '../../app/features/players/playersApiSlice';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useState, useEffect } from 'react';


function MessageToolBar() {
    const [opened, { open, close }] = useDisclosure(false);
    const [isPlayerSearchDisabled, setIsPlayerSearchDisabled] = useState(false)
    const [dropDownValue, setDropDownValue] = useState([]);
    const [dropDownData, setDropDownData] = useState([])
    const {
        data: players,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch, 
    } = useGetPlayersQuery()
    
    const allPlayers = useSelector(selectAllPlayers);


    useEffect(() => {
    if (isSuccess) {
      const newDropDownData = allPlayers.map((player) => ({
        value: `${player.id}`,
        label: `${player.playerName}`,
      }));
      setDropDownData(newDropDownData);
    }
  }, [isSuccess, allPlayers]);

    useEffect(() => {
        setIsPlayerSearchDisabled(isLoading);
    }, [isLoading])
    


    return (
      <>
        <Paper shadow="xs" mx="md" p="xs" >
        <Group position="apart">
        <Group>
        {/* <Text  fw={500}>Select A Player:</Text> */}
        <MultiSelect
        maxSelectedValues={1}
        w={200}
        data={dropDownData}
        placeholder="Pick A Player"
        maxDropdownHeight={160}
        searchable limit={20}
        value={dropDownValue}
        onChange={(value) => setDropDownValue(value)}
        nothingFound="Nothing found"
        disabled={isPlayerSearchDisabled}
        />
        </Group>
        <Button onClick={open}>New Message</Button>
        </Group>
        
        <Modal opened={opened} onClose={close}   title="New Message" centered>
        
        </Modal>

       
        </Paper>
      </>
    );
    
  }

  export {MessageToolBar}