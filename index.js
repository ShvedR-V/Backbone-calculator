const calculator = new CalculatorModel({});

const calculatorView = new CalculatorView({
  model: calculator
});

$('#calculator-container').append(calculatorView.el);


// const Router = Backbone.Router.extend({
  
//   routes: {
//     '': 'index',
//     'calculator': 'calculator',
//     'actions': 'actions'
//   },

//   index: function() {
//     console.log('index');
//     const calculator = new CalculatorModel({});

//     const calculatorView = new CalculatorView({
//       model: calculator
//     });

//     $('#calculator-container').append(calculatorView.el);
//   },

//   calculator: function() {
//     console.log('calc');
//   },

//   actions: function() {
//     console.log('actions');
//   }

// });

// const project = new Router();

// Backbone.history.start();