const operationButtons = [
  {
    value: '-',
    buttonClass: 'operation-minus'
  },
  {
    value: '+',
    buttonClass: 'operation-plus'
  },
  {
    value: '*',
    buttonClass: 'operation-multiply'
  },
  {
    value: '/',
    buttonClass: 'operation-divide'
  },
  {
    value: 'sqrt',
    buttonClass: 'operation-sqrt'
  },
  {
    value: 'x',
    buttonClass: 'operation-erase'
  },
  {
    value: '.',
    buttonClass: 'operation-dot'
  },
  {
    value: '=',
    buttonClass: 'operation-equal'
  },
];

const CalculatorView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#calculator-template').html()),

  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template());
    this.renderOperationalButtons();
    this.renderNumericButtons();
    return this;
  },

  renderOperationalButtons: function() {
    operationButtons.forEach((button) => {
      this.renderButton({
        value: button.value,
        buttonClass: button.buttonClass
      })
    });
  },

  renderNumericButtons: function() {
    for (let i =0; i< 10; i++) {
      this.renderButton({
        value: i,
        buttonClass: `number-${i}`
      })
    }
  },
  renderButton: function(params) {
    const button = new ButtonView({
      model: new ButtonModel({
        value: params.value,
        buttonClass: params.buttonClass
      })
    });
    this.$(`.${params.buttonClass}`).append(button.el);
  }
});

const ButtonView = Backbone.View.extend({
  tagName: 'button',
  template: _.template($('#button-template').html()),
  events: {
    'click': 'click'
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  click: function() {
    console.log('clicked on ' + this.model.toJSON().value + ' button');
  }
});