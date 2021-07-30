const ListItemView = Backbone.View.extend({
  template: _.template($('#action-list-item-template').html()),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
