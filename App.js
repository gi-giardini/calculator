import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}
//current values' position

const App = () => {
  const [state, setState] = useState({...initialState})

  const addDigit = n => {
    if(n === '.' && state.displayValue.includes('.')){
      return
    }

    const clearDisplay = state.displayValue === '0' || state.clearDisplay
    const currentValue = clearDisplay ? '' : state.displayValue
    const displayValue = currentValue + n
    setState({...state, displayValue, clearDisplay: false})

    if(n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...state.values]
      values[state.current] = newValue
      setState({...state, values, displayValue, clearDisplay: false})
    }
  }

  const clearMemory = () => {
    setState({...initialState});
  }

  const setOperation = operation => {
    if(state.current === 0) {
      setState({...state, operation, current: 1, clearDisplay: true})
    }else {
      const equals = operation === '='
      const values = [...state.values]
      try {
        values[0] = eval(`${values[0]} ${state.operation} ${values[1]}`)
      }catch(e) {
        values[0] = state.values[0]
      }

      values[1] = 0
      setState({
        ...state,
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
      })
      console.log(state)
    }
  }

  return (
    <View style={styles.container}>
      <Display value={state.displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit}/>
        <Button label="9" onClick={addDigit}/>
        <Button label="*" operation onClick={setOperation}/>
        <Button label="4" onClick={addDigit}/>
        <Button label="5" onClick={addDigit}/>
        <Button label="6" onClick={addDigit}/>
        <Button label="-" operation onClick={setOperation}/>
        <Button label="1" onClick={addDigit}/>
        <Button label="2" onClick={addDigit}/>
        <Button label="3" onClick={addDigit}/>
        <Button label="+" operation onClick={setOperation}/>
        <Button label="0" double onClick={addDigit}/>
        <Button label="." onClick={addDigit}/>
        <Button label="=" operation onClick={setOperation}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
