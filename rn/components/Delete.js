import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import axios from "axios";

const DeleteModel = () => {
  const [sifra, setSifra] = useState("");

  const handleDelete = async () => {
    try {
      if (!sifra) {
        Alert.alert("Greška", "Unesite odgovarajući ID");
        return;
      }

      axios.interceptors.request.use(r => {
        console.log(JSON.stringify(r, null, 2));
        return r;
      });

      let httpService = axios.create({
        baseURL: 'http://192.168.156.20:8080/',
        headers: {
          "content-type": "application/json"
        }
      });

      console.log("Brisanje modela");
      console.log(sifra);

      const response = await httpService.delete(`api/ffos/model/delete?sifra=${sifra}`);
      Alert.alert("Uspjeh", "Model uspješno obrisan");
    } catch (error) {
      if (error.response) {
        console.error(error.response);
        Alert.alert("Greška", "Model nije moguće obrisati");
      } else {
        console.error(error);
        Alert.alert("Greška", "Došlo je do greške prilikom komunikacije sa serverom");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Unesite ID modela kojeg želite obrisati</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={sifra}
        onChangeText={(text) => setSifra(text)}
        keyboardType="numeric"
      />

      <Button title="Obriši model" onPress={handleDelete} color="#bc0402"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 60,
    width: "100%",
    borderColor: "#bc0402",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "rgba(188, 4, 2, 0.2)",
    textAlign: "center",
  },
  text: {
    paddingBottom: 25,
    textAlign: "center"
  }
});

export default DeleteModel;
