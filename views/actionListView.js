const ActionListView = Backbone.View.extend({
  template: _.template($('#action-list-template').html()),

  initialize: function() {
    this.render();
    this.renderActionList();
  },

  renderActionList: function() {
    if (this.model.attributes.actions.length > 0) {
      this.model.attributes.actions.forEach(action => {
        this.renderListItem(action);
      });
    } else {
      const emptyItem = new listItemEmptyView({
        model: new actionItemModel({})
      })
      this.$('.list-group').append(emptyItem.el);
    }
  },

  renderListItem: function(actionInfo) {
    const actionItem = new ListItemView({
      model: new actionItemModel({
        ...actionInfo
      }),
    })
    this.$('.list-group').append(actionItem.el);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
