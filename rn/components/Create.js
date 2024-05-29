import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import axios from "axios";

const CreateModel = () => {
  const [inputData, setInputData] = useState({
    naziv: "",
    brojPotrosenihKalorija: "",
  });

  const handleInputChange = (key, value) => {
    setInputData({ ...inputData, [key]: value });
  };

  const handleCreate = async () => {
    try {
      if (!inputData.naziv || !inputData.brojPotrosenihKalorija) {
        Alert.alert("Greška", "Potrebno je ispuniti sva polja");
        return;
      }

      axios.interceptors.request.use(r => {
        console.log(JSON.stringify(r, null, 2));
        return r;
      });

      let httpService = axios.create({
        baseURL: "http://192.168.156.20:8080/",
        headers: {
          "content-type": "application/json"
        }
      });

      console.log("Ide na server");
      let p = {
        "naziv": inputData.naziv,
        "brojPotrosenihKalorija": parseInt(inputData.brojPotrosenihKalorija)
      };
      console.log(p);

      const response = await httpService.post("api/ffos/model/post", p);
      Alert.alert("Uspjeh", "Model uspješno kreiran");
    } catch (error) {
      if (error.response) {
        console.error(error.response);
        Alert.alert("Greška", "Model nije moguće kreirati");
      } else {
        console.error(error);
        Alert.alert("Greška", "Došlo je do greške prilikom komunikacije sa serverom");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Unesite ID i naziv modela kojeg želite kreirati</Text>
      <TextInput
        style={styles.input}
        placeholder="Naziv"
        value={inputData.naziv}
        onChangeText={(text) => handleInputChange("naziv", text)}
      />

      <TextInput
        style={[styles.input, { marginBottom: 0 }]}
        placeholder="Broj potrošenih kalorija"
        value={inputData.brojPotrosenihKalorija.toString()}
        onChangeText={(text) => handleInputChange("brojPotrosenihKalorija", parseInt(text) || 0)}
        keyboardType="numeric"
      />

      <Text>{"\n"}</Text>

      <Button title="Kreiraj model" onPress={handleCreate} color="#007a17" />
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
    borderColor: "#007a17",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "rgba(12, 174, 66, 0.2)",
    textAlign: "center",
  },
  text: {
    paddingBottom: 30
  }
});

export default CreateModel;
