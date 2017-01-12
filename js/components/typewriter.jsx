import React, {Component, PropTypes} from 'react';
import Input from './input';
import TextPanel from './text-panel';
import Timer from './timer';

class Typewriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivia un hidalgo de los de lanza en astillero, adarga antigua, rocin flaco y galgo corredor. Una olla de algo mas vaca que carnero, salpicon las mas noches, duelos y quebrantos los sabados, lentejas los viernes, algun palomino de añadidura los domingos, consumian las tres partes de su hacienda. El resto della concluian sayo de velarte, calzas de velludo para las fiestas con sus pantuflos de lo mismo, los dias de entre semana se honraba con su vellori de lo mas fino. Tenia en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que asi ensillaba el rocin como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años, era de complexion recia, seco de carnes, enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que tenia el sobrenombre de Quijada o Quesada (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por conjeturas verosimiles se deja entender que se llama Quijana; pero esto importa poco a nuestro cuento; basta que en la narracion del no se salga un punto de la verdad.',
      word: '',
      inputDisabled: false,
      timeLeft: props.timeLeft,
      time: 0,
      keyStrokes: 0,
      completedWords: 0,
      errors: 0
    };
  }

  onInputDataChange(data) {
    this.setState({
      keyStrokes: data.keyStrokes,
      word: data.value,
      inputValue: data.value
    });
  }

  onWordFound(data) {
    this.setState({ 
      timeLeft: this.state.timeLeft + 1,
      completedWords: this.state.completedWords + 1,
      word: '',
      inputValue: ''
    });
  }

  onTimerDataChange(data) {
    this.setState({
      timeLeft: data.timeLeft,
      time: data.time
    });
    if (!data.running) {
      this.setState({
        inputDisabled: true,
        inputValue: ''
      });
    } else {
      this.refs.textPanel.showWord();
    }
  }

  onWordNotFound(data) {
    this.setState({
      errors: this.state.errors + 1,
      inputValue: ''
    });
  }

  render() {
    return (
      <div>
        <Timer
          timeLeft={this.state.timeLeft}
          onDataChange={this.onTimerDataChange.bind(this)} />
        <TextPanel
          ref="textPanel"
          text={this.state.text}
          word={this.state.word}
          onWordNotFound={this.onWordNotFound.bind(this)}
          onWordFound={this.onWordFound.bind(this)} />
        <Input
          autofocus
          defaultValue={this.state.inputValue}
          disabled={this.state.inputDisabled}
          onDataChange={this.onInputDataChange.bind(this)} />
      </div>
    );
  }

};

Typewriter.PropTypes = {
  timeLeft: PropTypes.number
};

Typewriter.defaultProps = {
  timeLeft: 30
};

export default Typewriter;