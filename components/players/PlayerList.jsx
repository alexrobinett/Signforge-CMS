import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Badge,Indicator } from '@mantine/core';
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
  IconCast,
} from '@tabler/icons-react';



function PlayerList( {data} ) {

  // const tags = badges.map((badge) => (
   
  // ))

  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
        <Indicator color="green" size={8} >
          <IconCast/>
          </Indicator>
          <div>
            <Text fz="sm" fw={500}>
              {item.playerName}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text fz="xs">{item.id}</Text>

      </td>
      <td>
         <Badge size="xs" variant="outline">Default</Badge>
      </td>
      <td>
        <Text fz="xs">{item.playlist}</Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <Menu
            transitionProps={{ transition: 'pop' }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconMessages size="1rem" stroke={1.5} />}>Send message</Menu.Item>
              <Menu.Item icon={<IconNote size="1rem" stroke={1.5} />}>Add note</Menu.Item>
              <Menu.Item icon={<IconTrash size="1rem" stroke={1.5} />} color="red">
                Delete Player
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 600 }} verticalSpacing="md">
      <thead>
          <tr>
            <th>Player Name</th>
            <th>Player Id</th>
            <th>Tags</th>
            <th>Playlist</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export {PlayerList}