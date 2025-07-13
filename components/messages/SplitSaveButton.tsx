import React from 'react';
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
  IconCalendar,
  IconChevronDown,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
// Replace this with your actual API call
async function addNewMessage(formData) {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error('Failed to save message');
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

function SplitSaveButton({ formData, form, playerId, handleTrashClick }) {
  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6];
  const mutation = useMutation({
    mutationFn: addNewMessage,
    onSuccess: () => {
      handleTrashClick();
      form.reset();
    },
    onError: (error) => {
      // Optionally show an error toast or message
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
        onClick={form.onSubmit(() => handleMessageSave())}
      >
        Save Message
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

export { SplitSaveButton };
