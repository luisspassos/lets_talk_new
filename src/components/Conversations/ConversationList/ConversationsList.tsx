import { Flex, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import { useConversationsTab } from '../../../contexts/ConversationsTabContext';
import { Conversation } from './Conversation';
import { ConversationDivider } from './Conversation/ConversationDivider';
import { Divider } from '../Divider';
import { AddContactButton } from './AddContactButton';
import { SearchInput } from './SearchInput';
import { useCallback, useState } from 'react';

export function ConversationListComponent() {
  const { isOpen } = useConversationsTab();
  const conversations = [
    {
      uid: 'uid-1',
      photoURL: 'https://github.com/luisspassos.png',
      name: 'luis',
      updatedAt: 1234567890,
      updatedAtFormatted: '09:48',
      lastMessage: 'seilaaaaaaaaaaaaa',
      messages: [],
    },
    {
      uid: 'uid-2',
      photoURL: 'https://github.com/luisspassos.png',
      name: 'luis',
      updatedAt: 1234567890,
      updatedAtFormatted: '09:48',
      lastMessage: 'seilaaaaaaaaaaaaa',
      messages: [],
    },
    {
      uid: 'uid-3',
      photoURL: 'https://github.com/luisspassos.png',
      name: 'luis',
      updatedAt: 1234567890,
      updatedAtFormatted: '09:48',
      lastMessage: 'seilaaaaaaaaaaaaa',
      messages: [],
    },
    {
      uid: 'uid-4',
      photoURL: 'https://github.com/luisspassos.png',
      name: 'luis',
      updatedAt: 1234567890,
      updatedAtFormatted: '09:48',
      lastMessage: 'seilaaaaaaaaaaaaa',
      messages: [],
    },
    {
      uid: 'uid-5',
      photoURL: 'https://github.com/luisspassos.png',
      name: 'luis',
      updatedAt: 1234567890,
      updatedAtFormatted: '09:48',
      lastMessage: 'seilaaaaaaaaaaaaa',
      messages: [],
    },
    {
      uid: 'uid-6',
      photoURL: 'https://github.com/luisspassos.png',
      name: 'luis',
      updatedAt: 1234567890,
      updatedAtFormatted: '09:48',
      lastMessage: 'seilaaaaaaaaaaaaa',
      messages: [],
    },
  ];

  const [conversationSearch, setConversationSearch] = useState('');

  const changeConversationSearchState = useCallback(
    (conversationSearch: string) => {
      setConversationSearch(conversationSearch);
    },
    []
  );

  const fetchedConversations = conversations;

  const numberOfConversations = fetchedConversations.length;

  return (
    <Flex
      display={isOpen ? 'flex' : 'none'}
      w={['265px', '295px', '335px']}
      h='100vh'
      bg={useColorModeValue('gray.200', 'gray.400')}
      p={['19px 19px 0', '22px 22px 0', '25px 25px 0']}
      direction='column'
    >
      <AddContactButton />
      <Divider />
      <SearchInput
        changeConversationSearchState={changeConversationSearchState}
      />
      <Heading
        as='h1'
        fontWeight={400}
        fontSize={['22px', '26px', '30px']}
        mb={['7px', '10px', '13px']}
      >
        Conversas
      </Heading>
      <VStack
        overflowY='auto'
        pb={['6px', '8px', '10px']}
        mx={['-19px', '-22px', '-25px']}
        spacing={0}
      >
        <ConversationDivider position='sticky' top={0} left={0} mt={0} />
        {fetchedConversations.map(
          ({ uid, name, photoURL, lastMessage, updatedAtFormatted }, i) => (
            <Conversation
              key={uid}
              index={i}
              numberOfConversations={numberOfConversations}
              data={{
                name,
                photoURL,
                lastMessage,
                updatedAtFormatted,
              }}
            />
          )
        )}
      </VStack>
    </Flex>
  );
}
