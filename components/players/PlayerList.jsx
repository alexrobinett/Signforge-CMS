import {
  Table,
  Text,
  ScrollArea,
  Loader,
  Container,
  Group,
  Card,
} from '@mantine/core';

import { usePlayers } from '../../app/features/players/playersApi';
import { useInputState, useMediaQuery } from '@mantine/hooks';
import { PlayerRow } from './PlayerRow';

function PlayerList() {
  const { data, isLoading, isSuccess, isError, error, refetch } = usePlayers();
  const allPlayers = data ?? [];
  const isMobile = useMediaQuery('(max-width: 568px)');

  if (isLoading) {
    return (
      <Container mt={30}>
        <Group position="center">
          <Loader size="xl" variant="bars" />
        </Group>
      </Container>
    );
  }

  if (isError) {
    return <Text>{error?.data?.message}</Text>;
  }

  if (isSuccess) {
    const rows = allPlayers.map((player) => (
      <PlayerRow
        playerName={player.playerName}
        id={player.id}
        key={player.id}
        refetch={refetch}
      />
    ));

    return (
      <ScrollArea>
        <Card mt={20} m={10} shadow="xs">
          <Table
            sx={isMobile ? { minWidth: 100 } : { minWidth: 500 }}
            verticalSpacing="sm"
            horizontalSpacing={3}
          >
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Player Id</th>
                {isMobile ? null : (
                  <>
                    <th>Tags</th>
                    <th>Playlist</th>
                  </>
                )}

                <th />
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Card>
      </ScrollArea>
    );
  }
}

export { PlayerList };
