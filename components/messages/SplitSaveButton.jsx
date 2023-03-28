import { createStyles, Button, Menu, Group, ActionIcon, rem } from '@mantine/core';
import { IconTrash, IconBookmark, IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { useAddNewMessageMutation } from '../../app/features/message/messagesApiSlice';






const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

function SplitSaveButton({formData, form, playerId}, props) {
  const { classes, theme } = useStyles();
  const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6];
  const [addNewMessage,{
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewMessageMutation()


async function handleMessageSave(){
    try{
      console.log(playerId)
      await addNewMessage(formData)
      form.reset()
    }catch{
      console.error(error)
    }
  }
  
  function handleTrashMessage(){
    console.log('clicked')
    form.reset()
   

  }


  // async function handleMessageDraft(file){
  //   try{
    
  //   }catch{
  //     console.error("could't upload file!")
  //   }
  // }
  

  return (
    <Group noWrap spacing={0}>
      <Button className={classes.button} type="submit" onClick={form.onSubmit(() => {
       handleMessageSave() 
    })}>Save Message</Button >
      <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
        <Menu.Target >
          <ActionIcon
            variant="filled"
            color={theme.primaryColor}
            size={36}
            className={classes.menuControl}
            
           
          >
            <IconChevronDown size="1rem" stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconBookmark size="1rem" stroke={1.5} color={menuIconColor} />}>
            Save draft
          </Menu.Item>
          <Menu.Item onClick={handleTrashMessage} icon={<IconTrash size="1rem" stroke={1.5} color={menuIconColor}  />}>
            Trash
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export {SplitSaveButton}