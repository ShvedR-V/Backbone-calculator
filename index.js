const calculator = new CalculatorModel({});
let calculatorView;
let actionListView;

const Router = Backbone.Router.extend({
  
  routes: {
    '': 'calculator',
    'actions': 'actions'
  },

  calculator: function() {

    if (actionListView) {
      actionListView.remove();
    }
    calculatorView = new CalculatorView({
      model: calculator
    });

    $('#main-container').append(calculatorView.el);
  },

  actions: function() {
    if (calculatorView) {
      calculatorView.remove();
    }
    actionListView = new ActionListView({
      model: calculator
    });

    $('#main-container').append(actionListView.el);
  }

});

const project = new Router();

Backbone.history.start();