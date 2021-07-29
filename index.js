const calculator = new CalculatorModel({});

const calculatorView = new CalculatorView({
  model: calculator
});

$('#calculator-container').append(calculatorView.el);
