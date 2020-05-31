import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import QRCode from './components/QRCode'



function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ana Sayfa</Text>
      <Button
        title="QR Kod oku"
        onPress={() => navigation.navigate('QRCode')}
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="QRCode" component={QRCode} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
