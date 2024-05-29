import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const getBySifra = () => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const fetchSifraById = () => {
    if (!id) {
      Alert.alert("Greška", "Unesite ID modela");
      return;


    }

    setLoading(true);
    axios
      .get(`http:/192.168.156.20:8080/api/ffos/model/getBySifra?sifra=${id}`)
      .then((response) => {
        setModel(response.data);
      })

      .catch((error) => {
        console.error("Greška tijekom dohvaćanja modela:", error);
        Alert.alert("Greška", "Nije moguće dohvatiti model");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Unesite ID i kliknite na gumb kako bi dobili model s traženim ID-em</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <Button title="Prikaži model" onPress={fetchSifraById} color="#1677e9" />

      {loading ? (
      <ActivityIndicator size="large" color="#1677e9" /> 
    ) : model ? (
      <View style={styles.item}>
        <Text>Naziv: {model.naziv}</Text>
        <Text>Broj potrošenih kalorija: {model.brojPotrosenihKalorija}</Text>
      </View>
    ) : null}
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
  input: {
    height: 40,
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#1677e9",
    backgroundColor: "rgba(22, 119, 233, 0.2)",
    textAlign: "center",
  },
  item: {
    width: "100%",
    margin: 2,
    marginBottom: 10,
    padding: 10,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#1677e9",
    backgroundColor: "rgba(22, 119, 233, 0.2)",
  },
  text: {
    paddingBottom: 20,
    textAlign: "center",
  }
});

export default getBySifra;
