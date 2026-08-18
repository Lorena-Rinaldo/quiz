import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import questions from "../questions.json";
import { Ionicons } from "@expo/vector-icons";

export default function QuizScreen({ onFinish }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (selectedOption !== null) return;

    if (timer === 0) {
      handleTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, selectedOption]);

  function handleTimeUp() {
    setSelectedOption("TIME_UP");
    setTimeout(() => goToNextQuestion(), 2500);
  }

  function changeQuestion(opcao) {
    if (selectedOption !== null) return;

    setSelectedOption(opcao);

    if (opcao === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => goToNextQuestion(), 2500);
  }

  function goToNextQuestion() {
    const proximoIndice = currentQuestionIndex + 1;

    if (proximoIndice < questions.length) {
      setCurrentQuestionIndex(proximoIndice);
      setSelectedOption(null);
      setTimer(30);
    } else {
      onFinish(score);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Ionicons
          name="time-outline"
          size={24}
          color={timer <= 10 ? "#A70100" : "#D2A56C"}
        />
        <Text style={[styles.timerText, timer <= 10 && { color: "#A70100" }]}>
          {timer}s
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => {
          let estiloBotao = styles.option;
          if (selectedOption !== null) {
            if (option === currentQuestion.correctAnswer)
              estiloBotao = styles.correctOption;
            else if (option === selectedOption)
              estiloBotao = styles.wrongOption;
          }

          return (
            <TouchableOpacity
              key={option}
              style={estiloBotao}
              onPress={() => changeQuestion(option)}
              disabled={selectedOption !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
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
    width: "100%",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    gap: 8,
  },
  timerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D2A56C",
  },
  questionContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#D2A56C",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  optionsContainer: {
    width: "100%",
    flex: 2,
    justifyContent: "space-around",
  },
  option: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#C8934F",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  correctOption: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#63783F",
    backgroundColor: "#99CE85",
    alignItems: "center",
  },
  wrongOption: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#A70100",
    backgroundColor: "#FF5455",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
  },
});
