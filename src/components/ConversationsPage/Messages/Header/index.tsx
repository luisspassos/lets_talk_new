import { Flex, VStack } from '@chakra-ui/react';
import { Divider } from '../../../Divider';
import { ConversationsTabToggleButton } from './ConversationsTabToggleButton';
import { Wrapper } from './Wrapper';
import { Avatar } from './ContactInfo/Avatar';
import { OnlineAt } from './ContactInfo/OnlineAt';
import { ContactName } from './ContactInfo/ContactName';
import { EndButtons } from './EndButtons';

export function Header() {
  return (
    <>
      <Wrapper>
        <Flex minW={0} align='center' gap={['12px', '15px', '18px']}>
          <ConversationsTabToggleButton />

          <Avatar />

          <VStack minW={0} align='start' spacing={0}>
            <ContactName />
            <OnlineAt />
          </VStack>
        </Flex>
        <EndButtons />
      </Wrapper>
      <Divider />
    </>
  );
}