import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Calculator = () => {
  const buttonsLeft = [
    ['C', 'DEL'],
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.'],
  ];
  const buttonsRight = ['/', '*', '-', '+', '='];

  const [theme, setTheme] = useState('light');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) setTheme(savedTheme);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const handleButtonPress = (btn) => {
    if (['+', '-', '*', '/', '=', 'C', 'DEL'].includes(btn)) {
      Vibration.vibrate(50);
    }

    if (btn === 'C') {
      setExpression('');
      setResult('');
    } else if (btn === 'DEL') {
      setExpression(expression.slice(0, -1));
    } else if (btn === '=') {
      try {
        const evalResult = eval(expression);
        setResult(evalResult.toString());
        setExpression('');
      } catch {
        setResult('Error');
      }
    } else {
      setExpression(expression + btn);
    }
  };

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#263238' : '#f2f2f3' }]}>
      <View style={styles.top}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Ionicons name={isDark ? 'sunny' : 'moon'} size={28} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <View style={styles.resultContainer}>
          <Text style={[styles.expression, { color: isDark ? '#fff' : '#000' }]}>
            {expression || '0'}
          </Text>
          <Text style={[styles.result, { color: '#00BCD4' }]}>{result || '0'}</Text>
        </View>
      </View>

      <View style={[styles.bottom, { backgroundColor: isDark ? '#37474F' : '#fff' }]}>
        <View style={styles.buttonContainer}>
          <View style={styles.leftButtons}>
            {buttonsLeft.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((btn) => (
                  <TouchableOpacity
                    key={btn}
                    onPress={() => handleButtonPress(btn)}
                    style={[
                      styles.button,
                      {
                        backgroundColor: ['C', 'DEL'].includes(btn)
                          ? '#FF5722'
                          : isDark
                          ? '#455A64'
                          : '#fff',
                        flex: btn === '0' ? 2 : 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { color: ['C', 'DEL'].includes(btn) ? '#fff' : isDark ? '#fff' : '#333' },
                      ]}
                    >
                      {btn}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.rightButtons}>
            {buttonsRight.map((btn) => (
              <TouchableOpacity
                key={btn}
                onPress={() => handleButtonPress(btn)}
                style={[
                  styles.button,
                  { backgroundColor: '#FF9800', flex: 1, marginBottom: 5, borderRadius: 8 },
                ]}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  themeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  resultContainer: {
    alignItems: 'flex-end',
  },
  expression: {
    fontSize: 30,
    marginBottom: 10,
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  bottom: {
    flex: 2,
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftButtons: {
    flex: 3,
    marginRight: 5,
  },
  rightButtons: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Calculator;