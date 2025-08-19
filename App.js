import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './src/navigation';
import { RootSiblingParent } from 'react-native-root-siblings';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RootSiblingParent>
      <SafeAreaProvider style={{ backgroundColor: '#000' }}>
        <StatusBar barStyle={'light-content'} />
        <SafeAreaView style={styles.container}>
          <RootNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
