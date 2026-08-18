import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ResultScreen({ score, totalQuestions, onRestart }) {
  const percentage = (score / totalQuestions) * 100;

  let message =
    percentage >= 70
      ? "Muito bem! Você conhece muito!"
      : "Não desanime! Tente de novo.";
  let iconName = percentage >= 70 ? "star" : "sad-outline";

  return (
    <View style={styles.container}>
      <View style={styles.resultCard}>
        <Ionicons
          name={iconName}
          size={80}
          color="#fff"
          style={{ marginBottom: 20 }}
        />
        <Text style={styles.title}>Quiz Finalizado!</Text>

        <View style={styles.scoreRow}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={styles.totalText}> de {totalQuestions} acertos</Text>
        </View>

        <Text style={styles.message}>{message}</Text>

        <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
          <Ionicons name="refresh" size={24} color="#D2A56C" />
          <Text style={styles.restartButtonText}>Tentar Novamente</Text>
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
  resultCard: {
    width: "100%",
    backgroundColor: "#D2A56C",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  totalText: {
    fontSize: 20,
    color: "#fff",
    opacity: 0.9,
  },
  message: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  restartButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    gap: 10,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D2A56C",
  },
});
