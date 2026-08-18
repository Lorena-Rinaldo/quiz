import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import questions from "../questions.json";
import { Ionicons } from "@expo/vector-icons";

export default function QuizScreen() {

  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(30);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!gameStarted || quizFinished || selectedOption !== null) return;

    if (timer === 0) {
      handleTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, quizFinished, selectedOption, gameStarted]);

  function handleTimeUp() {
    setSelectedOption("TIME_UP");
    setTimeout(() => goToNextQuestion(), 2500);
  }

  function changeQuestion(opcao) {
    if (selectedOption !== null) return;
    setSelectedOption(opcao);
    if (opcao === currentQuestion.correctAnswer) setScore(score + 1);
    setTimeout(() => goToNextQuestion(), 2500);
  }

  function goToNextQuestion() {
    const proximoIndice = currentQuestionIndex + 1;
    if (proximoIndice < questions.length) {
      setCurrentQuestionIndex(proximoIndice);
      setSelectedOption(null);
      setTimer(30);
    } else {
      setQuizFinished(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
    setTimer(30);
    setGameStarted(true); 
  }

  // --- 1. TELA INICIAL ---
  if (!gameStarted) {
    return (
      <View style={styles.container}>
        <View style={styles.startCard}>
          <Ionicons
            name="book"
            size={100}
            color="#fff"
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.resultTitle}>Quiz Bíblico</Text>
          <Text style={styles.messageText}>
            Você está pronto para o desafio das 20 perguntas mais difíceis?
          </Text>

          <TouchableOpacity
            style={styles.restartButton}
            onPress={() => setGameStarted(true)}
          >
            <Ionicons name="play" size={24} color="#D2A56C" />
            <Text style={styles.restartButtonText}>Começar Jogo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- 2. TELA DE RESULTADO ---
  if (quizFinished) {
    const percentage = (score / questions.length) * 100;
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
          <Text style={styles.resultTitle}>Quiz Finalizado!</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{score}</Text>
            <Text style={styles.totalText}> de {questions.length} acertos</Text>
          </View>
          <Text style={styles.messageText}>{message}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Ionicons name="refresh" size={24} color="#D2A56C" />
            <Text style={styles.restartButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- 3. TELA DE JOGO ---
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
  },
  startCard: {
    width: "100%",
    backgroundColor: "#D2A56C",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    elevation: 8,
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
  resultCard: {
    width: "100%",
    backgroundColor: "#D2A56C",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 8,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  scoreContainer: {
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
  messageText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontStyle: "italic",
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
