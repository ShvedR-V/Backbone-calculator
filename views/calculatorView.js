const CalculatorView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#calculator-template').html()),

  events: {
    'click .btn': 'onClickButton',
    'keydown .screen': 'onKeyPress'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:actions', this.onActionListChange, this);
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    this.renderScreen();
    return this;
  },

  onActionListChange: function() {
    console.log(this.model)
    this.renderListItem();
  },

  renderListItem: function() {
    const itemInfo = this.model.attributes.actions[this.model.attributes.actions.length - 1];
    const actionItem = new ListItemView({
      model: new actionItemModel({
        ...itemInfo
      }),
    })
    this.$('.list-group').append(actionItem.el);
  },

  renderScreen: function(){
    this.screen = new ScreenView({
      model: this.model
    })
    this.$('.screen-container').append(this.screen.el);
  },

  onClickButton: function(event){
    const symbol = $(event.currentTarget)[0].innerText;
    const operation = $(event.currentTarget)[0].attributes.operation.value;
    this.model.getKey(operation, symbol);
  },

  validateKeyBoardPress: function(keyValue) {
    return /^[0-9]+$/.test(keyValue)
  },

  onKeyPress: function(event) {
    const screenValue = this.$('.screen').val();
    if(this.validateKeyBoardPress(event.key)){
      this.model.getKey(event.key, event.key);
    } else {
      event.preventDefault();
    }
    $(".screen").val('');
    if (screenValue !== '0') {
      $(".screen").val(screenValue);
    }
    $(".screen").focus();
  }
});
