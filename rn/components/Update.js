import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';

const UpdateModelScreen = () => {
  const [id, setId] = useState('');
  const [naziv, setNaziv] = useState('');
  const [brojPotrosenihKalorija, setBrojPotrosenihKalorija] = useState('');


  const handleUpdateModel = () => {
    const payload = {
      sifra: parseInt(id, 10), 
      naziv: naziv,
      brojPotrosenihKalorija: parseInt(brojPotrosenihKalorija, 10) 
    };
  
    console.log('Šalji payload:', JSON.stringify(payload));
  
    fetch('http://192.168.156.20:8080/api/ffos/model/put', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        console.log('Odgovor:', response.status); 
        return response.json().then((data) => {
          if (!response.ok) {
            throw new Error(data.error || 'Nepoznata greška');
          }
          return data;
        });
      })
      .then((data) => {
        Alert.alert('Uspjeh', data.poruka); 
      })
      .catch((error) => {
        console.log('Greška:', error);
        Alert.alert('Greška', error.message);
      });
  };
  

  return (
      <View>
        <Text style={styles.text}>Unesite ID modela i nove podatke koje želite promijeniti na modelu</Text>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
          placeholder="ID"
        />
        <TextInput
          style={styles.input}
          value={naziv}
          onChangeText={setNaziv}
          placeholder="Naziv"
        />
        <TextInput
          style={styles.input}
          value={brojPotrosenihKalorija}
          onChangeText={setBrojPotrosenihKalorija}
          keyboardType="numeric"
          placeholder="Broj potrošenih kalorija"
        />
        <View style={styles.buttonContainer}>
          <Button title="Promijeni model" onPress={handleUpdateModel} color="#c78100"/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: '#c78100',
    borderWidth: 2,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: "rgba(199, 129, 0, 0.2)",
    textAlign: "center",
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  text: {
    paddingBottom: 25,
    textAlign: "center"
  }
});


export default UpdateModelScreen;
