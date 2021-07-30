const listItemEmptyView = Backbone.View.extend({
  template: _.template($('#action-list-empty-template').html()),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});


