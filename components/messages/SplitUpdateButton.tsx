import {
  createStyles,
  Button,
  Menu,
  Group,
  ActionIcon,
  rem,
} from '@mantine/core';
import {
  IconTrash,
  IconBookmark,
  IconChevronDown,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
// Replace with your actual API call
async function updateMessage(formData) {
  const response = await fetch(`/api/messages/${formData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error('Failed to update message');
  return response.json();
}


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

function SplitUpdateButton({
  formData,
  form,
  playerId,
  handleTrashClick,
  refetchMessages,
  setMessageUpdate,
}) {
  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6];
  const mutation = useMutation({
    mutationFn: updateMessage,
    onSuccess: () => {
      setMessageUpdate((currentState) => !currentState);
      handleTrashClick();
      refetchMessages();
      form.reset();
    },
    onError: (error) => {
      console.error(error);
    },
  }); // Already v5 syntax

  function handleMessageSave() {
    mutation.mutate(formData);
  }

  function handleTrashMessage() {
    handleTrashClick();
    form.reset();
  }

  return (
    <Group noWrap spacing={0}>
      <Button
        className={classes.button}
        type="submit"
        onClick={form.onSubmit(() => {
          handleMessageSave();
        })}
      >
        Update Message
      </Button>
      <Menu
        transitionProps={{ transition: 'pop' }}
        position="bottom-end"
        withinPortal
      >
        <Menu.Target>
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
          <Menu.Item
            icon={
              <IconBookmark size="1rem" stroke={1.5} color={menuIconColor} />
            }
          >
            Save draft
          </Menu.Item>
          <Menu.Item
            onClick={() => handleTrashMessage()}
            icon={<IconTrash size="1rem" stroke={1.5} color={menuIconColor} />}
          >
            Trash
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export { SplitUpdateButton };
