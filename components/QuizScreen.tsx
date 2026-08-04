import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function QuizScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Qual propriedade do Flexbox é usada para distribuir os itens ao longo
          do eixo principal?</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>A) alignItems</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>B) justifyContent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>C) flexDirection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>D) flexWrap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "white",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "fff",
  },
  optionText: {
    fontSize: 18,
  },
});
