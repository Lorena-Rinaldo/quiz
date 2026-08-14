import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import questions from "../questions.json";

export default function QuizScreen() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex]

  const [selectedOption, setSelectedOption] = useState(null);

  const [score, setScore] = useState(0);

  const [quizFinished, setQuizFinished] = useState(false);

  function changeQuestion(opcao) {
    if (selectedOption !== null) return;

    setSelectedOption(opcao);

    if (opcao === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const proximoIndice = currentQuestionIndex + 1;

      if (proximoIndice < questions.length) {
        setCurrentQuestionIndex(proximoIndice);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
      }
    }, 2500);
  }

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>Quiz Finalizado!</Text>
        <Text style={styles.optionText}>
          Sua pontuação: {score} de {questions.length}
        </Text>
        <TouchableOpacity
          style={[styles.option, { marginTop: 20 }]}
          onPress={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setQuizFinished(false);
            setSelectedOption(null);
          }}
        >
          <Text>Recomeçar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => {
          let estiloBotao = styles.option;
          if (selectedOption !== null) {
            if (option === currentQuestion.correctAnswer){
              estiloBotao = styles.correctOption;
            }
            else if(option === selectedOption){
              estiloBotao = styles.wrongOption;
            }
          }

          return (
            <TouchableOpacity
              key={option}
              style={estiloBotao}
              onPress={() => changeQuestion(option)}
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
  },
  questionContainer: {
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
    flex: 1,
    justifyContent: "space-around",
  },
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#C8934F",
    backgroundColor: "#fff",
  },
  correctOption: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#63783F",
    backgroundColor: "#99CE85",
  },
  wrongOption: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#A70100",
    backgroundColor: "#FF5455",
  },
  optionText: {
    fontSize: 18,
  },
});
