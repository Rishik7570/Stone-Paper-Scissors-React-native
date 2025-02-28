import {Modal, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
  const [playerVal, setPlayerVal] = useState('');
  const [compVal, setCompVal] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [showTitle,setShowTitle] = useState(true);
  const [showWinner,setShowWinner] = useState(false);

  const logic = (playerChoice: string, compChoice: string) => {
    if (playerChoice === compChoice) {
      return 0;
    } else if (
      (playerChoice === 'ROCK' && compChoice === 'SCISSORS') ||
      (playerChoice === 'SCISSORS' && compChoice === 'PAPER') ||
      (playerChoice === 'PAPER' && compChoice === 'ROCK')
    ) {
      return 1;
    } else {
      return -1;
    }
  };

  const decision = (playerChoice: string) => {
    const choices = ['ROCK', 'PAPER', 'SCISSORS'];
    const compChoice = choices[Math.floor(Math.random() * choices.length)];

    console.log('Before updating state:', { playerChoice, compChoice });

    setPlayerVal(playerChoice);
    setCompVal(compChoice);

    const value = logic(playerVal, compVal);

    console.log('Before updating score:', { value });

    if (value === 1) {
      setPlayerScore(prevScore => prevScore + 1);
    } else if (value === -1) {
      setCompScore(prevScore => prevScore + 1);
    }

    console.log('After updating score:', { playerScore, compScore });
  };

  const winnerNotification = () => {
    return(
      <View style={styles.winnerScreen}>
        <Text style={styles.winnerTxt}>The winner is {playerScore === 5 ? 'You' : 'Computer'}</Text>
      </View>
    );
  };

  const reset = () => {
    setPlayerVal('');
    setCompVal('');
    setPlayerScore(0);
    setCompScore(0);
  };

  useEffect(()=>{

    setTimeout(()=>{
      setShowTitle(false);
    },2000);

    if(playerScore === 5 || compScore === 5){
      setShowWinner(true);
      setTimeout(()=>{
        setShowWinner(false);
        reset();
      },3000);
    }
  },[playerScore,compScore,playerVal,compVal]);

  return (
    <View style={styles.container}>

      {/* Game winner screen */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showWinner}
        onRequestClose={()=>setShowWinner(false)}
      >
        {winnerNotification()}
      </Modal>

      {/* Title */}
      {showTitle && <Text style={styles.titleTxt}>
        Rock Paper Scissors game
      </Text>}

      {/* Game */}
      {!showTitle && !showWinner && <View style={styles.gameContainer}>
        <Text style={styles.titleTxt}>Enter your choice:</Text>

        {/* Buttons */}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => decision('ROCK')}>
            <Text style={styles.btnTxt}>Rock</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => decision('SCISSORS')}>
            <Text style={styles.btnTxt}>Scissors</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => decision('PAPER')}>
            <Text style={styles.btnTxt}>Paper</Text>
          </TouchableOpacity>
        </View>

        {/* Scores */}
        <View style={styles.scoreContainer}>
          <View style={styles.score}>
            <Text style={styles.scoreTxt}>Your choice</Text>
            <Text style={styles.scoreTxt}>{playerVal}</Text>
            <Text style={styles.scoreTxt}>{playerScore}</Text>
          </View>
          <View style={styles.score}>
            <Text style={styles.scoreTxt}>Comp choice</Text>
            <Text style={styles.scoreTxt}>{compVal}</Text>
            <Text style={styles.scoreTxt}>{compScore}</Text>
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetBtn} onPress={()=>reset()}>
          <Text style={styles.resetTxt}>Reset Game</Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#95a5a6',
  },
  titleTxt: {
    fontSize:30,
    fontWeight:'bold',
    marginBottom:40,
  },
  gameContainer:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
  },
  btnContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'80%',
    marginBottom:40,
  },
  btn:{
    backgroundColor:'#0fb9b1',
    borderRadius:10,
  },
  btnTxt:{
    padding:8,
    fontSize:25,
    color:'white',
  },
  scoreContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#3498db',
  },
  score:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    width:'50%',
    marginBottom:40,
  },
  scoreTxt:{
    fontSize:25,
  },
  resetBtn:{
    backgroundColor:'#eb3b5a',
    borderRadius:10,
  },
  resetTxt:{
    padding:6,
    fontSize:25,
    color:'white',
  },
  winnerScreen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
  },
  winnerTxt:{
    fontSize:20,
    fontWeight:'bold',
  },
});
