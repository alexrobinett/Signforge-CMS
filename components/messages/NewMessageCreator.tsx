import { Card } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useState } from 'react';
import { MessageForm } from './MessageForm';

function NewMessageCreator({
  playerId,
  handleTrashClick,
  messageUpdate,
  messageId,
  setMessageUpdate,
}) {
  const [state, handlers] = useListState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  return (
    <Card mt={20} shadow="xs" mx="md" p="md">
      <MessageForm
        playerId={playerId}
        handleTrashClick={handleTrashClick}
        messageUpdate={messageUpdate}
        setMessageUpdate={setMessageUpdate}
        messageId={messageId}
      />
    </Card>
  );
}

export { NewMessageCreator };
