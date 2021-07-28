const CalculatorView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#calculator-template').html()),

  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

