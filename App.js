
import React from 'react';
import { View } from 'react-native';
import styles from './style/style';
import Header from './components/Header';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <Header />
        <Gameboard />
        <Footer />
      </View>
    )
  }
}

