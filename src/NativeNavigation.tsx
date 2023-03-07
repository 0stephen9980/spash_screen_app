import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import SplashScreen from './splashscreen/SplashScreen';

import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const storage = new MMKVStorage.Loader().initialize();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

interface RouteProps {}

const Stack = createNativeStackNavigator();

const SplashScreenStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const Route = (props: RouteProps) => {
  const [isFreshInstall, setIsFreshInstall] = useMMKVStorage(
    'isFreshInstall',
    storage,
    'false',
  );

  return (
    <NavigationContainer theme={MyTheme}>
      {isFreshInstall ? <SplashScreenStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default Route;
