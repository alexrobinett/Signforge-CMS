import React from 'react';
import { PlayerList } from './PlayerList';
import { PlayersBar } from './PlayersBar';

function PlayersPage() {
  return (
    <>
      <PlayersBar />
      <PlayerList />
    </>
  );
}

export { PlayersPage };
