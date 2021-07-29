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
    this.renderScreen();
    return this;
  },

  renderScreen: function(){
    this.screen = new ScreenView({
      model: this.model
    })
    this.$('.screen').append(this.screen.el);
  },

  onClickButton: function(event){
    const symbol = $(event.currentTarget)[0].innerText;
    const operation = $(event.currentTarget)[0].attributes.operation.value;
    this.model.getKey(operation, symbol);
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
