import * as React from 'react';

import { NativeBaseProvider } from 'native-base';
import Rotas from './config/Rotas';

import {LinearGradient} from "expo-linear-gradient"

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
}

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <Rotas />
    </NativeBaseProvider>
  );
}
