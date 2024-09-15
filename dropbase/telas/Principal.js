import * as React from 'react';
import { A } from '@expo/html-elements';
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

import Cabecalho from '../components/Cabecalho'

export default function Principal({ navigation }) {
  return (

 <Box flex="justify" flexDirection="column">
        <Cabecalho />
    <Box rounded="md" flexDirection="column" alignItems="center">
      <Box
        padding="10"
        marginBottom={4}
        borderRadius={32}
        bg={{
          linearGradient: {
            colors: ['pink.300', 'violet.200'],
          },
        }}>
        <Pressable onPress={() => navigation.navigate('FeedProdutoCompra')}>
          <Text> Compras </Text>
        </Pressable>
      </Box>

      <Box
        padding="10"
        marginBottom={4}
        borderRadius={32}
        bg={{
          linearGradient: {
            colors: ['pink.300', 'violet.200'],
          },
        }}>
        <Pressable onPress={() => navigation.navigate('FeedProdutoVenda')}>
          <Text> Vendas </Text>
        </Pressable>
      </Box>
    </Box>
  </Box>

  );
}
