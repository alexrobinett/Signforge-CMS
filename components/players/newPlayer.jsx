import {
    createStyles,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
  } from '@mantine/core';
  import { IconArrowLeft } from '@tabler/icons-react';
  import { useAddNewPlayerMutation } from '../../app/features/players/playersApiSlice';
  import { useInputState } from '@mantine/hooks';
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: rem(26),
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    controls: {
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
  }));

 function NewPlayer({handleClose, refetch}) {
    const { classes } = useStyles();
    const [newPlayerName, setNewPlayerName] = useInputState('')
    const [addNewPlayer,{
        isLoading,
        isSuccess,
        isError,
        error
      }] = useAddNewPlayerMutation()
      
  
      const canUpdate = [newPlayerName].every(Boolean) && !isLoading;
 

      async function handleNewPlayerClick(){
        if(canUpdate){
            try{
                await addNewPlayer({"playerName": `${newPlayerName}`})
                handleClose() 
                refetch()


            }catch{
                console.error('failed to update Player Name', error)
            }
        } 
    }
    return (
      <Container size={460} my={10}>
          <TextInput value={newPlayerName} onChange={setNewPlayerName} label="PlayerName" placeholder="New Player Name" required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={rem(12)} stroke={1.5} />
                <Box ml={5}>Back to Player List</Box>
              </Center>
            </Anchor>
            <Button 
            className={classes.control} 
            onClick={ () => handleNewPlayerClick()}> 
            New Player
            </Button>
          </Group>
      </Container>
    );
  }

  export {NewPlayer}