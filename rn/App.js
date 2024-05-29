import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Create from './components/Create';
import Get from './components/Get';
import GetBySifra from './components/GetBySifra';
import Update from './components/Update';
import Delete from './components/Delete';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'create':
        return <Create />;
      case 'get':
        return <Get />;
      case 'getBySifra':
        return <GetBySifra />;
      case 'update':
        return <Update />;
      case 'delete':
        return <Delete />;
      default:
        return null;
    }
  };

  const handleButtonPress = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {currentScreen ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentScreen(null)}>
              <Text style={styles.backButtonText}>{"<"}  Glavni izbornik</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            {renderScreen()}
          </View>
        </>
      ) : (
        <View style={styles.buttonList}>
          <CustomButton title="Kreiraj model" color="#007a17" onPress={() => handleButtonPress('create')} />
          <CustomButton title="Dohvati model" color="#1677e9" onPress={() => handleButtonPress('get')} />
          <CustomButton title="Dohvati model - šifra" color="#1677e9" onPress={() => handleButtonPress('getBySifra')} />
          <CustomButton title="Promijeni model" color="#c78100" onPress={() => handleButtonPress('update')} />
          <CustomButton title="Obriši model" color="#bc0402" onPress={() => handleButtonPress('delete')} />
        </View>
      )}
    </SafeAreaView>
  );
};

const CustomButton = ({ title, color, onPress }) => {
  const lighterColor = color + '33';

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: lighterColor, borderColor: color }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 40,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  backButtonText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  container: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default App;
