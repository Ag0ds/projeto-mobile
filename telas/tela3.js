import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Tela3({navigation}) {

  function goTela4() {
    navigation.navigate('Tela4');
  }

  return (
    <View style={styles.container}>
      <Text>TELA3</Text>
      <Button title="Go Tela4" onPress={goTela4}>Tela4</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
