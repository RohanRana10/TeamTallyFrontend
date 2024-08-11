import { StyleSheet } from 'react-native';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './screens/Signup';
import Splash from './screens/Splash';
import { useFonts } from 'expo-font';
import Dashboard from './screens/Dashboard';
import CreateGroup from './screens/CreateGroup';
import Group from './screens/Group';
import GroupSettings from './screens/GroupSettings';
import EditGroup from './screens/EditGroup';
import CreatePayment from './screens/CreatePayment';
import Profile from './screens/Profile';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/userContext';
import { ToastProvider } from 'react-native-toast-notifications';

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    "Outfit-Regular": require('./assets/fonts/Outfit-Regular.ttf'),
    "Pacifico-Regular": require('./assets/fonts/Pacifico-Regular.ttf'),
    "Outfit-SemiBold": require('./assets/fonts/Outfit-SemiBold.ttf'),
    "Outfit-Bold": require('./assets/fonts/Outfit-Bold.ttf'),
    "Outfit-Medium": require('./assets/fonts/Outfit-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ToastProvider>
        <UserProvider>
          <Stack.Navigator initialRouteName='Splash'
            screenOptions={{
              headerShown: false,
              presentation: 'transparentModal'
              // transitionSpec: {
              //   open: { animation: 'timing', config: { duration: 0 } }, // Disable animation
              //   close: { animation: 'timing', config: { duration: 0 } },
              // },
            }}>
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name='CreateGroup' component={CreateGroup} options={{ headerShown: false }} />
            <Stack.Screen name='Group' component={Group} options={{ headerShown: false }} />
            <Stack.Screen name='GroupSettings' component={GroupSettings} options={{ headerShown: false }} />
            <Stack.Screen name='EditGroup' component={EditGroup} options={{ headerShown: false }} />
            <Stack.Screen name='CreatePayment' component={CreatePayment} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
          </Stack.Navigator>
        </UserProvider>
      </ToastProvider>
    </NavigationContainer >
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
