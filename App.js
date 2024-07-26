import { StyleSheet  } from 'react-native';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './screens/Signup';
import Splash from './screens/Splash';
import { useFonts } from 'expo-font';
import Dashboard from './screens/Dashboard';

const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    "Outfit-Regular": require('./assets/fonts/Outfit-Regular.ttf'),
    "Pacifico-Regular": require('./assets/fonts/Pacifico-Regular.ttf'),
    "Outfit-Bold": require('./assets/fonts/Outfit-Bold.ttf'),
    "Outfit-Medium": require('./assets/fonts/Outfit-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'
        screenOptions={{
          headerShown: false,
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 0 } }, // Disable animation
            close: { animation: 'timing', config: { duration: 0 } },
          },
        }}>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
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
