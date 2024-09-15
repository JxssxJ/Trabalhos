import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Button,
  Box,
  HStack,
  VStack,
  Center,
  TextArea,
  Text,
  ScrollView
} from 'native-base';
import { database } from '../config/Firebase';

import Cabecalho from '../components/Cabecalho'

import { SelectList } from 'react-native-dropdown-select-list';

export default function ProdutoForm({ navigation, route }) {
  const { item } = route.params;
  const [selected, setSelected] = React.useState('');

  const tipo = [
    { key: '1', value: 'Masculino' },
    { key: '2', value: 'Feminino' },
    { key: '3', value: 'Infantil' },
  ];

  const [produto, setProduto] = useState({
    valor: item.valor || '',
    id: item.id || '',
    titulo: item.titulo || '',
    tipo: item.tipo || '',
    texto: item.texto || '',
  });

  const saveData = async () => {
    try {
      if (produto.titulo == '' || produto.titulo == undefined) {
        throw 'Informe um valor para o titulo';
      }

      if (produto.texto == '' || produto.texto == undefined) {
        throw 'Informe um valor para o Texto';
      }

      let key = await database
        .ref('produto')
        .push(produto)
        .then((snapshot) => {
          console.log('Inserido!' + snapshot.key);
          return snapshot.key;
        })
        .catch((error) => console.log(error));

      produto.id = key;

      database.ref('produto/' + key).set(produto);

      navigation.push('FeedProdutoVenda');
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const editData = async () => {
    try {
      if (produto.titulo == '' || produto.titulo == undefined) {
        throw 'Informe um valor para o titulo';
      }

      if (produto.texto == '' || produto.texto == undefined) {
        throw 'Informe um valor para o Texto';
      }

      await database
        .ref('produto/' + produto.id)
        .set(produto)
        .then((snapshot) => {
          console.log('Atualizado!' + snapshot.key);
        })
        .catch((error) => console.log(error));

      navigation.push('FeedProdutoVenda');
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <ScrollView>
    <Box>
    <Box>
      <Cabecalho />
    </Box>
      <Center flex={1} px="3">
        <FormControl mb="5">
          <FormControl.Label>Nome do Produto</FormControl.Label>
          <Input
            value={produto.titulo}
            onChangeText={(value) => setProduto({ ...produto, titulo: value })}
            placeholder="Nome do Produto"
          />
        </FormControl>
        <FormControl mb="5">
        <FormControl.Label>Valor do Produto</FormControl.Label>
          <Input
            type="number"
            value={produto.valor}
            onChangeText={(value) => setProduto({ ...produto, valor: value })}
            placeholder="Valor do Produto"
          />
        </FormControl>
        <SelectList
          setSelected={(value) => setProduto({ ...produto, tipo: value })}
          data={tipo}
          placeholder="Tipo"
          save="value"
          boxStyles={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#d9d9d9',
            padding: 8,
          }}
          dropdownStyles={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#d9d9d9',
            padding: 8,
          }}
        />
        <FormControl mb="1">
          <FormControl.Label>Descrição</FormControl.Label>
          <TextArea
            h={20}
            value={produto.texto}
            onChangeText={(value) => setProduto({ ...produto, texto: value })}
            placeholder="Escreva a descrição do produto"
          />
        </FormControl>
        <Button onPress={!item ? saveData : editData}>
          {!item ? 'Salvar' : 'Editar'}
        </Button>
      </Center>
    
    </Box>
    </ScrollView>
  );
}
