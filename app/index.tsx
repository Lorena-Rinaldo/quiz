import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import StartScreen from "../components/StartScreen";
import QuizScreen from "../components/QuizScreen";
import ResultScreen from "../components/ResultScreen";
import questions from "../questions.json";

export default function HomePage() {

  const [currentScreen, setCurrentScreen] = useState("START");
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = () => {
    setCurrentScreen("QUIZ");
  };

  const handleFinishQuiz = (score) => {
    setFinalScore(score);
    setCurrentScreen("RESULT");
  };

  const handleRestart = () => {
    setFinalScore(0);
    setCurrentScreen("QUIZ");
  };

  return (
    <View style={styles.container}>
      {currentScreen === "START" && (
        <StartScreen onStart={handleStartGame} />
      )}

      {currentScreen === "QUIZ" && (
        <QuizScreen onFinish={handleFinishQuiz} />
      )}

      {currentScreen === "RESULT" && (
        <ResultScreen 
          score={finalScore} 
          totalQuestions={questions.length} 
          onRestart={handleRestart} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFDFBB",
  },
});