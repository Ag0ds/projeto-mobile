import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import Tela2 from './tela2';
import Tela3 from './tela3';

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name=" " component={Tela2} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Tela3" component={Tela3} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}