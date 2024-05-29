import React, { useState } from "react";
import { View, Text, Button, Alert, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const GetModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [showText, setShowText] = useState(true);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://192.168.156.20:8080/api/ffos/model/get");
      console.log("Greška:", response.data);
      setModels(response.data);
    } catch (error) {
      console.error("Greška tijekom dohvaćanja modela:", error);
      Alert.alert("Greška", "Nije moguće dohvatiti modele");
    } finally {
      setLoading(false);
    }
  };

  const handleShowModels = () => {
    setShowModels(true);
    fetchModels();
    setShowText(false);
  };

  const handleRefresh = () => {
    fetchModels();
  };

  return (
    <View style={styles.container}>
      {showText && (
        <Text style={styles.text}>Kliknite na gumb kako bi prikazali sve modele u bazi</Text>
      )}

      {!showModels && (
        <Button title="Prikaži modele" onPress={handleShowModels} color="#1677e9" />
      )}

      {showModels && (
        <>



          {loading ? (
            <ActivityIndicator size="large" color="#1677e9" />

          ) : (
            <FlatList

              contentContainerStyle={styles.list}
              data={models}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>

                  <Text>Naziv: {item.naziv}</Text>
                  <Text>Broj potrošenih kalorija: {item.brojPotrosenihKalorija}</Text>

                </View>

              )}

            />
          )}
          <Text style={styles.text}>Kliknite na gumb kako bi osvježili modele u bazi</Text>
          <View style={styles.refreshButtonContainer}>
            <Button title="Osvježi" onPress={handleRefresh} color="#1677e9" />
          </View>
        </>
      )}
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
  refreshButtonContainer: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#1677e9",
    backgroundColor: "rgba(22, 119, 233, 0.2)",
    textAlign: "center",
  },
  text: {
    paddingBottom: 20,
    textAlign: "center",
  }
});

export default GetModels;
