const codes = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  equals: "=",
  add: "+",
  subtract: "-",
  divide: "/",
  multiply: "*",
  decimal: ".",
  clear: "C"
};

//<p id="history">{props.history}</p>
function Display(props) {
  return (
    <>
      <div id="display">{props.display}</div>
    </>
  );
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pad">
        {Object.entries(codes).map((e, i) => (
          <span
            key={i}
            onClick={this.props.handleCalc}
            className={"button btn-" + e[0]}
            id={e[0]}
          >
            {e[1]}
          </span>
        ))}
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      display: 0,
      formula: ""
    };
    this.state = { ...this.defaultState };
  }

  handleCalc = (n) => {
    const btn = codes[n.target.id];
    const formula = this.state.formula;
    if (btn === "C") return this.setState({ ...this.defaultState });
    if (btn === "=") {
      const result = eval(this.state.formula) + "";
      return this.setState({
        display: result,
        formula: result
      });
    }
    // WARNING, DO NOT COPY THIS, THIS SHOULD BE REFACTORIZED
    // Even i don't need 2 variables...
    switch (true) {
      case formula === "":
        if(/[0-9\-]/.test(btn))
          this.setState(state => ({
            display: formula + btn,
            formula: formula + btn
          }))
         if(btn === ".")
           this.setState(state => ({
            display: formula + "0" + btn,
            formula: formula + "0" + btn
          }))
        break;
      case /\d+(\.\d+)?$/.test(formula):
        const lastNumInput = formula.match(/\d+(\.\d+)?$/)[0]
        if(/^0(?!\.)/.test(lastNumInput)){
          if(btn !== ".") return
        }
        if(/[\-+*/]/.test(btn))
          this.setState(state => ({
            display: formula + btn,
            formula: formula + btn
          }))
        if(/[0-9\-]/.test(btn))
          this.setState(state => ({
            display: formula + btn,
            formula: formula + btn
          }))
        if(btn === "." && lastNumInput.includes(".")) return
        else this.setState(state => ({
            display: formula + btn,
            formula: formula + btn
          }))
        break;
      case formula.slice(-1) === ".":
        if(/[0-9]/.test(btn))
          this.setState(state => ({
            display: formula + btn,
            formula: formula + btn
          }))
        break;
      case /[*+/]-$/.test(formula) && btn !== "-":
        if(/[0-9]/.test(btn))
          this.setState(state => ({
            display: formula + btn,
            formula: formula + btn
          }))
        if(/[+*/]/.test(btn)){
          this.setState(state => ({
            display: formula.slice(0, -2) + btn,
            formula: formula.slice(0, -2) + btn
          }))
        }
        break;
      case /[\-+*/]$/.test(formula):
        const lastOpInput = formula.match(/[\-+*/]$/)[0]
        if(/[0-9]/.test(btn))
          this.setState(state => ({
            display: formula + btn,
            formula: formula + btn
          }))
        if(/[+*/]/.test(btn)){
          this.setState(state => ({
            display: formula.slice(0, -1) + btn,
            formula: formula.slice(0, -1) + btn
          }))
        }
        if(!/\-$/.test(formula) && btn === "-"){
          this.setState(state => ({
            display: formula + btn,
            formula: formula + btn
          }))
        }
        break;
    }
  };

  render() {
    return (
      <>
        <div id="calculator">
          <Display display={this.state.display} />
          <Buttons handleCalc={this.handleCalc} />
        </div>
      </>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("wrapper"));