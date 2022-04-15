import {
  Avatar,
  Box,
  Flex,
  Heading,
  Popover,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Tooltip } from '../../../Tooltip';
import { Divider } from '../Divider';
import { ConversationInfoIconButton } from './ConversationInfo/IconButton';
import { ConversationInfoPopover } from './ConversationInfo/Popover';

export function Header() {
  const popoverInitialFocusRef = useRef(null);

  return (
    <>
      <Flex
        flexShrink={0}
        as='header'
        justify='space-between'
        minW={0}
        h='85px'
        minH={0}
        align='center'
      >
        <Flex minW={0} align='center' gap='18px'>
          <Avatar w='55px' h='55px' src='https://github.com/luisspassos.png' />

          <VStack minW={0} align='start' spacing={0}>
            <Heading
              w='100%'
              maxW='700px'
              textOverflow='ellipsis'
              overflow='hidden'
              whiteSpace='nowrap'
              as='h3'
              fontSize='17px'
              fontWeight={400}
            >
              Guilherme DE CASTRO DE CASTRO DE CASTRO DE CASTRO DE CASTRO DE
              CASTRO DE CASTRO DE CASTRO DE CASTRO
            </Heading>
            <Text as='time' fontSize='14px' opacity='80%'>
              Hoje ás 19:48
            </Text>
          </VStack>
        </Flex>
        <Popover
          initialFocusRef={popoverInitialFocusRef}
          placement='bottom-start'
          isLazy
        >
          <Tooltip
            ariaLabel='Informações da conversa'
            label='Informações da conversa'
            placement='bottom-start'
          >
            <Box display='inline-block'>
              <PopoverTrigger>
                <Box display='inline-block'>
                  <ConversationInfoIconButton />
                </Box>
              </PopoverTrigger>
            </Box>
          </Tooltip>

          <ConversationInfoPopover ref={popoverInitialFocusRef} />
        </Popover>
      </Flex>
      <Divider />
    </>
  );
}
