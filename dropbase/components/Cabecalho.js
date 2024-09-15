import * as React from 'react';
import {
  Avatar,
  Button,
  Box,
  Text,
  Icon,
  Image,
  Center,
  ZStack,
  HStack,
  Pressable,
  FlatList,
} from 'native-base';

import { Feather } from '@expo/vector-icons';

export default function Cabecalho({ navigation }) {
  return (

{/* Cabeçalho */},

{/* Menu */},
    <Box flex={1} flexDirection="column">
      <HStack
        padding={4}
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        safeArea>
        <Box>
          <Pressable>
            <Icon as={Feather} name="menu" size={7} color="black" />
          </Pressable>
        </Box>

{/* Nome */}
        <Text bold fontSize="2xl">
          {' '}
          DropShop{' '}
        </Text>

{/* Notificação */}
        <Box rounded="md" flexDirection="row" alignItems="center">
          <Pressable>
            <Icon
              as={Feather}
              name="bell"
              size={7}
              color="black"
              marginRight={4}
            />
          </Pressable>

{/* Avatar */}
          <Pressable>
            <Avatar
              source={{
                uri: 'https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg',
              }}
              height={12}
              width={12}
            />
          </Pressable>
        </Box>
      </HStack>

{/* Filtro de Departamento*/}
      
    </Box>
  );
}