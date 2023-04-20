import { Paper, Button,  Modal, Group, Pagination, Autocomplete, MultiSelect, Container, Loader, Text, Select} from '@mantine/core';
import { useGetPlayersQuery, selectAllPlayers } from '../../app/features/players/playersApiSlice';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { SplitSaveButton } from './SplitSaveButton';




function MessageToolBar({handlePlayerUpdate, handleNewMessageButton, newMessagePage}) {
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
    } = useGetPlayersQuery()
    
    const allPlayers = useSelector(selectAllPlayers);


 


    useEffect(() => {
    if (isSuccess) {
      const newDropDownData = allPlayers.map((player) => ({
        value: `${player.id}`,
        label: `${player.playerName}`,
      } ));
      setDropDownData(newDropDownData);
    }
  }, [isSuccess, allPlayers]);

    useEffect(() => {
        setIsPlayerSearchDisabled(isLoading);
    }, [isLoading])


    useEffect(()=> {
        const selectedLabel = dropDownData.find((item) => item.value === String(dropDownValue))?.label
        handlePlayerUpdate(dropDownValue, selectedLabel)
    },[dropDownValue] )
    
    const messageTypes = [ {value: 'c-store',
      label: 'C Store Message',}]
  
    

    return (
      <>
        <Paper shadow="xs" mx="md" p="xs" >
        {newMessagePage === false? 
        ( <Group position="apart">
        <Group>
        {/* <Text  fw={500}>Select A Player:</Text> */}
        <Select
        w={200}
        data={dropDownData}
        placeholder="Pick A Player to Edit"
        maxDropdownHeight={160}
        searchable limit={20}
        value={dropDownValue}
        onChange={(value) => setDropDownValue(value)}
        nothingFound="Nothing found"
        disabled={isPlayerSearchDisabled}
        />
        </Group>
        <Button onClick={()=> handleNewMessageButton()}>New Message</Button>
        </Group>
        ): (
        <Group position="apart">
        <Group>
        <Select
        w={200}
        data={dropDownData}
        placeholder="Player"
        maxDropdownHeight={160}
        searchable limit={20}
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

  export {MessageToolBar}