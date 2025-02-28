import {Modal, TouchableOpacity, StyleSheet, Text, View, StatusBar, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

const App = () => {
  const [playerVal, setPlayerVal] = useState('');
  const [compVal, setCompVal] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [showTitle,setShowTitle] = useState(true);
  const [showWinner,setShowWinner] = useState(false);

  const rock = <Icon name="hand-rock-o" size={40} color="black" />;
  const scissor = <Icon name="hand-scissors-o" size={40} color="black" />;
  const paper = <Icon name="hand-paper-o"  size={40} color="black" />;

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

    setPlayerVal(playerChoice);
    setCompVal(compChoice);

    setTimeout(() => {
      const value = logic(playerChoice, compChoice);

      if (value === 1) {
        setPlayerScore(prev => prev + 1);
      } else if (value === -1) {
        setCompScore(prev => prev + 1);
      }
    }, 500);

    setTimeout(()=>{
      setPlayerVal('');
      setCompVal('');
    },1000);
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

  const playerIconSign = () => {
    if(playerVal === 'ROCK'){
      return rock;
    }
    else if(playerVal === 'SCISSORS'){
      return scissor;
    }
    else if(playerVal === 'PAPER'){
      return paper;
    }
    else {
      return;
    }
  };

  const compIconSign = () => {
    if(compVal === 'ROCK'){
      return rock;
    }
    else if(compVal === 'SCISSORS'){
      return scissor;
    }
    else if(compVal === 'PAPER'){
      return paper;
    }
    else {
      return;
    }
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
  },[playerScore,compScore]);

  return (
    <View style={styles.container}>
      <StatusBar />
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
            <Text style={styles.scoreSign}>{playerVal ? playerIconSign() : ''}</Text>
            <Text style={styles.scoreTxt}>{playerScore}</Text>
          </View>
          <View style={styles.score}>
            <Text style={styles.scoreTxt}>Comp choice</Text>
            <Text style={styles.scoreSign}>{compVal ? compIconSign() : ''}</Text>
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
    backgroundColor:'#0ABDE3',
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
    backgroundColor:'#FBD28B',
    borderRadius:10,
  },
  btnTxt:{
    padding:8,
    fontSize:25,
    color:'#000000',
  },
  scoreContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#DAE0E2',
    height:'40%',
  },
  score:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    width:width * 0.4,
    margin:10,
  },
  scoreTxt:{
    fontSize:20,
  },
  scoreSign:{
    marginTop:20,
    marginBottom:20,
  },
  resetBtn:{
    marginTop:40,
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
