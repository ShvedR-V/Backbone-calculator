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
