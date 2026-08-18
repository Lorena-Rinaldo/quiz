import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StartScreen({ onStart }) {
  return (
    <View style={styles.container}>
      <View style={styles.startCard}>
        <Ionicons
          name="book"
          size={100}
          color="#fff"
          style={{ marginBottom: 20 }}
        />
        <Text style={styles.title}>Quiz Bíblico</Text>
        <Text style={styles.message}>
          Você está pronto para o desafio das 20 perguntas mais difíceis?
        </Text>

        <TouchableOpacity style={styles.startButton} onPress={onStart}>
          <Ionicons name="play" size={24} color="#D2A56C" />
          <Text style={styles.startButtonText}>Começar Jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#EFDFBB",
    justifyContent: "center",
    alignItems: "center",
  },
  startCard: {
    width: "100%",
    backgroundColor: "#D2A56C",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 30,
  },
  startButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    gap: 10,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D2A56C",
  },
});
