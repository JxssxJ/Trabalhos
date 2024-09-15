import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Heading,
  FlatList,
  Box,
  HStack,
  VStack,
  Stack,
  Center,
  Avatar,
  Text,
  Spacer,
  Icon,
  Fab,
  Image,
  Pressable,
  Button,
  Divider,
  Input,
} from 'native-base';
import { database } from '../config/Firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Cabecalho from '../components/Cabecalho';
import { Feather } from '@expo/vector-icons';

export default function FeedProduto({ navigation }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [search, setSearch] = useState(null);
  2;

  const loadData = async () => {
    let vetorTemp = [];
    // Carregar os itens do banco de dados ao abrir a tela
    const ref = database.ref('produto');
    ref.on('value', (snapshot) => {
      let data = {};
      snapshot.forEach((child) => {
        data.id = child.key;
        data = child.val();

        vetorTemp.push(data);
      });
      setData(vetorTemp);
      setDataFilter(vetorTemp);
    });
  };

  const deleteData = (id) => {
    // alert(id);
    //console.log(id);
    database
      .ref('produto/' + id)
      .remove()
      .then(() => {
        console.log('Removido!');
        // setData([]); //seta um vetor vazio no estado
        setDataFilter([]); //seta um vetor vazio no estado
        setDataFilter(data);
        //  setData(data.filter((item) => item.id !== id));
        loadData(); // recarrega os dados que tem no banco
        navigation.navigate('FeedProduto');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //força o recarregamento da função loadData
    const load = navigation.addListener('focus', () => {
      let vetorTemp = [];
      const ref = database.ref('produto');

      ref.on('value', (snapshot) => {
        let data = {};
        snapshot.forEach((child) => {
          data.id = child.key;
          data = child.val();

          vetorTemp.push(data);
        });
        setData(vetorTemp);
        setDataFilter(vetorTemp);
      });
    });
    return () => {
      load; //recarrega a função loadData através da variavel load
      //      ref.off();
    };
  }, [navigation]);

  useEffect(() => {
    let vetorTemp = [];
    const ref = database.ref('produto');

    ref.on('value', (snapshot) => {
      let data = {};
      snapshot.forEach((child) => {
        data.id = child.key;
        data = child.val();

        vetorTemp.push(data);
      });
      setData(vetorTemp);
      setDataFilter(vetorTemp);
    });

    // Limpar a referência do banco de dados ao desmontar o componente
    return () => ref.off();
  }, []);

  const searchData = (texto) => {
    if (texto) {
      const novoVetor = data.filter((item) => {
        const itemData = item.titulo
          ? item.titulo.toUpperCase()
          : ''.toUpperCase();
        console.log(texto);
        const textData = texto.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDataFilter(novoVetor);
      setSearch(texto);
    } else {
      dataFilter(data);
      setSearch(texto);
      console.log(texto);
    }
  };

  return (
    <ScrollView>
      <Box>
        <Box>
          <Cabecalho />
        </Box>
        <Box>
          <Box flex={1} marginBotton={4} padding={2} borderRadius={4}>
            <HStack paddingX={4} justifyContent="space-between">
              <Box
                padding="2"
                borderRadius={32}
                bg={{
                  linearGradient: {
                    colors: ['blue.300', 'violet.200'],
                  },
                }}>
                <Pressable
                  onPress={(value) => searchData('Masculino')}
                  onClear={() => searchData('0')}>
                  <Text bold> Masculino </Text>
                </Pressable>
              </Box>
              <Box
                padding="2"
                borderRadius={32}
                bg={{
                  linearGradient: {
                    colors: ['pink.300', 'violet.200'],
                  },
                }}>
                <Pressable
                  onPress={(value) => searchData('Feminino')}
                  onClear={(value) => searchData('')}>
                  <Text bold> Feminino </Text>
                </Pressable>
              </Box>
              <Box
                padding="2"
                borderRadius={25}
                bg={{
                  linearGradient: {
                    colors: ['yellow.300', 'violet.200'],
                  },
                }}>
                <Pressable
                  onPress={(value) => searchData('Infantil')}
                  onClear={() => searchData('')}>
                  <Text bold> Infantil </Text>
                </Pressable>
              </Box>
            </HStack>
          </Box>
        </Box>
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            value={search}
            onChangeText={(value) => searchData(value)}
            onClear={(value) => searchData('')}
            placeholder="Pesquisar"
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<FontAwesome name="search" />}
              />
            }
          />
        </VStack>

        <FlatList
          data={dataFilter}
          renderItem={({ item }) => (
            <Box
              flex={1}
              flexDirection="column"
              marginBottom={4}
              backgroundColor="#FFF"
              padding={2}
              borderRadius={4}>
              <Pressable
                onPress={() => {
                  navigation.navigate('CompraProduto', { item: item || null });
                }}
                rounded="8"
                overflow="hidden"
                borderWidth="1"
                borderColor="coolGray.300"
                maxW="96"
                shadow="3"
                bg="coolGray.100"
                p="5">
                <Box marginY={3}>
                  <Heading size="sm" paddingBottom={1}>
                    {item.titulo}
                  </Heading>
                  <Text numberOfLines={2}>{item.texto}</Text>
                  <Text fontSize="xs">Tipo: {item.tipo}</Text>
                </Box>
                <HStack justifyContent="space-between">
                  <Box
                    marginY={1}
                    flexDirection="row"
                    backgroundColor="rgba(226,232,240,0.4)"
                    alignSelf="flex-Start"
                    borderRadius="6"
                    paddingX={3}
                    paddingY={1}>
                    <Text numberOfLines={1}>{data.vendedor}</Text>
                  </Box>

                  <Pressable onPress={() => {
                  navigation.navigate('CompraProduto', { item: item || null });
                }}>
                    <Box
                      flexDirection="row"
                      padding="2"
                      borderRadius={10}
                      bg={{
                        linearGradient: {
                          colors: ['green.400', 'green.100'],
                        },
                      }}>
                      <Icon
                        as={Feather}
                        name="shopping-cart"
                        size={5}
                        color="#000"
                        marginRigh={2}
                      />
                      <Text bold> R$ {item.valor}</Text>
                    </Box>
                  </Pressable>
                </HStack>
      
              </Pressable>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </ScrollView>
  );
}
