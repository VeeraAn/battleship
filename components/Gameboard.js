import React from 'react';
import { Text, View, Pressable, TouchableNativeFeedbackBase } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../style/style';


let board = [];
let shipPos = [];
const NBR_OF_ROWS = 5;
const NBR_OF_COLS = 5;
const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';

export default class Gameboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGameOn: false,
            hits: 0,
            ships: 3,
            bombs: 15,
            time: 0,
            seconds: 30,
            status: "Game has not started",
            button: "Start Game"
        };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.initializeBoard();
    }

    startGame() {
        this.initializeBoard();
        if (this.state.button === "New game") {
            this.resetTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.setState({
            isGameOn: true,
            time: this.state.time,
            seconds: 30,
            status: "Game is on",
            button: "New game"
        });
        this.timer = setInterval(this.countDown, 1000);
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds: seconds,
        });

        if (seconds == 0) {
            this.setState({
                isGameOn: false,
                status: "Game over. Time up. Ships remaining",
            });
            this.stopTimer();
        }
    }

    stopTimer() {
        this.setState({ isGameOn: false })
        clearInterval(this.timer)
    }

    resetTimer() {
        this.stopTimer();
        this.setState({
            time: 0,
            hits: 0,
            ships: 3,
            bombs: 15,
            seconds: 30,
            status: "Game has not started",
            button: "Start game"
        })
    }

    initializeBoard() {
        for (let i = 0; i < NBR_OF_ROWS * NBR_OF_COLS; i++) {
            board[i] = START;
        }
        shipPos = [];
        for (let i = 0; shipPos.length < 3; i++) {
            let random = Math.floor(Math.random() * 25);
            if (!shipPos.includes(random))
                shipPos.push(random);
        }
        //console.log(shipPos);
    }

    throwBomb(number) {
        if (this.state.isGameOn) {

            if (board[number] == START && this.state.bombs >= 1) {
                board[number] = this.isThereAShip(number) ? CIRCLE : CROSS;
                this.setState(state => ({
                    bombs: this.state.bombs - 1
                }), () => {
                    this.checkShips();
                });
            }
        } else {
            if (this.state.button != "New game") {
                this.setState({
                    status: "Click the start button first",
                })
            }

        }
    }

    checkShips() {
        if (this.state.ships === 0) {

            this.setState({
                isGameOn: false,
                status: "You sinked all ships",
            })
            this.stopTimer();

        } else if (this.state.bombs === 0) {

            this.setState({
                isGameOn: false,
                status: "Game over. Ships remaining",
            })
            this.stopTimer();

        }
    }

    isThereAShip(number) {
        if (shipPos.includes(number)) {
            this.setState({
                hits: this.state.hits + 1,
                ships: this.state.ships - 1,
            });
            return (true);
        } else {
            return (false);
        }

    }

    chooseItemColor(number) {
        if (board[number] === START) {
            return 'skyblue';
        }
        else if (board[number] === CROSS) {
            return "#FF3031";
        }
        else {
            return "#60a93d";
        }
    }

    render() {

        const firstRow = [];
        const secondRow = [];
        const thirdRow = [];
        const fourthRow = [];
        const fifthRow = [];

        for (let i = 0; i < NBR_OF_ROWS; i++) {
            firstRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.throwBomb(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }

        for (let i = NBR_OF_ROWS; i < NBR_OF_ROWS * 2; i++) {
            secondRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.throwBomb(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }

        for (let i = NBR_OF_ROWS * 2; i < NBR_OF_ROWS * 3; i++) {
            thirdRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.throwBomb(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS * 3; i < NBR_OF_ROWS * 4; i++) {
            fourthRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.throwBomb(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS * 4; i < NBR_OF_ROWS * 5; i++) {
            fifthRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.throwBomb(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemColor(i)} />
                </Pressable>
            )
        }

        return (
            <View style={styles.gameboard}>
                <View style={styles.flex}>{firstRow}</View>
                <View style={styles.flex}>{secondRow}</View>
                <View style={styles.flex}>{thirdRow}</View>
                <View style={styles.flex}>{fourthRow}</View>
                <View style={styles.flex}>{fifthRow}</View>

                <Pressable style={styles.button} onPress={() => this.startGame()}>
                    <Text style={styles.buttonText}>{this.state.button}</Text>
                </Pressable>
                <View style={styles.gameinfo}><Text>Hits: {this.state.hits} Bombs: {this.state.bombs} Ships: {this.state.ships} </Text></View>
                <View style={styles.gameinfo}><Text>Time: {this.state.seconds} sec</Text></View>
                <View style={styles.gameinfo}><Text>Status: {this.state.status}</Text></View>
            </View>
        )
    }

}