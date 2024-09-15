// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon,  Box } from 'native-base';
import ProdutoForm from '../telas/ProdutoForm';
import FeedProdutoCompra from '../telas/FeedProdutoCompra';
import FeedProdutoVenda from '../telas/FeedProdutoVenda';
import CompraProduto from '../telas/CompraProduto'
import Principal from '../telas/Principal';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Usuario from '../telas/Usuario'

const Tab = createBottomTabNavigator();

const StackHome = createNativeStackNavigator();
const StackConfig = createNativeStackNavigator();

function StackHomeScreen() {
  return (
    <StackHome.Navigator screenOptions={{ headerShown: false }}>
      <StackHome.Screen name="Principal" component={Principal} />
      <StackHome.Screen name="FeedProdutoCompra" component={FeedProdutoCompra} />
      <StackHome.Screen
        name="ProdutoForm"
        options={{ title: 'Formulário de Produto' }}
        component={ProdutoForm}
      />
      <StackHome.Screen
        name="CompraProduto"
        options={{ title: 'Compra de Produto' }}
        component={CompraProduto}
      />
      <StackHome.Screen name="FeedProdutoVenda" component={FeedProdutoVenda} />
    </StackHome.Navigator>

  );
}

function StackUserScreen() {
  return (
    <StackConfig.Navigator screenOptions={{ headerShown: false }}>
      <StackConfig.Screen name="Usuario" component={Usuario} />
      <StackConfig.Screen name="FeedProdutoVenda" component={FeedProdutoVenda} />
    </StackConfig.Navigator>
  );
}

function Rotas() {
  return (
    <NavigationContainer>
      {/* Componente responsavel por criar as rotas para navegar entre as telas do App  */}
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="inicio"
          component={StackHomeScreen}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: () => <Icon as={FontAwesome} name="home" size="sm" />,
          }}
        />
        <Tab.Screen
          name="config"
          component={StackUserScreen}
          options={{
            tabBarLabel: 'User',
            tabBarIcon: () => <Icon as={FontAwesome} name="user" size="sm" />,
          }}
        />
      
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Rotas;
