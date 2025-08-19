import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './src/navigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { I18nextProvider, useTranslation } from 'react-i18next';
import LanguageHooks from './src/hooks/LanguageHooks';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <I18nextProvider i18n={LanguageHooks}>
      <Provider store={store}>
        <RootSiblingParent>
          <SafeAreaProvider style={{ backgroundColor: '#000' }}>
            <StatusBar barStyle={'light-content'} />
            <SafeAreaView style={styles.container}>
              <RootNavigation />
            </SafeAreaView>
          </SafeAreaProvider>
        </RootSiblingParent>
      </Provider>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
