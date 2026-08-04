import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import questions from "../questions.json";

export default function QuizScreen() {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  const currentQuestion = questions[indiceAtual];

  function alterarQuestao(opcao) {
    if (opcaoSelecionada !== null) return;

    setOpcaoSelecionada(opcao);

    if (opcao === currentQuestion.correctAnswer) {
      setPontuacao(pontuacao + 1);
    }

    setTimeout(() => {
      const proximoIndice = indiceAtual + 1;

      if (proximoIndice < questions.length) {
        setIndiceAtual(proximoIndice);
        setOpcaoSelecionada(null);
      } else {
        setQuizFinalizado(true);
      }
    }, 2500);
  }

  if (quizFinalizado) {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>Quiz Finalizado!</Text>
        <Text style={styles.optionText}>
          Sua pontuação: {pontuacao} de {questions.length}
        </Text>
        <TouchableOpacity
          style={[styles.option, { marginTop: 20 }]}
          onPress={() => {
            setIndiceAtual(0);
            setPontuacao(0);
            setQuizFinalizado(false);
            setOpcaoSelecionada(null);
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
          if (opcaoSelecionada !== null) {
            if (option === currentQuestion.correctAnswer){
              estiloBotao = styles.correctOption;
            }
            else if(option === opcaoSelecionada){
              estiloBotao = styles.wrongOption;
            }
          }

          return (
            <TouchableOpacity
              key={option}
              style={estiloBotao}
              onPress={() => alterarQuestao(option)}
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
