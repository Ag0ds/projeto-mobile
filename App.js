import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

import Tela1 from './telas/tela1';
import Tela4 from './telas/tela4';
import Tabs from './telas/tabs';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Tela1} />
        <Stack.Screen name="Perfil" component={Tabs} />
        <Stack.Screen name="Criar conta" component={Tela4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}