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
    value: '√',
    buttonClass: 'operation-sqrt'
  },
  {
    value: 'C',
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

  events: {
    'click .btn': 'onClickButton'
  },

  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template());
    this.renderOperationalButtons();
    this.renderNumericButtons();
    this.renderScreen();
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
  },

  renderScreen: function(){
    this.screen = new ScreenView({
      model: this.model
    })
    this.$('.screen').append(this.screen.el);
  },

  onClickButton: function(event){
    const value = $(event.currentTarget)[0].innerText;
    this.model.getKey(value);
  }
});


const ScreenView = Backbone.View.extend({
  template: _.template($('#screen-template').html()),

  initialize: function() {
    this.listenTo(this.model, 'change:displayValue', this.render, this);
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});


const ButtonView = Backbone.View.extend({
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
});