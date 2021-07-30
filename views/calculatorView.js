const CalculatorView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#calculator-template').html()),

  events: {
    'click .btn': 'onClickButton',
  },

  initialize: function() {
    _.bindAll(this, 'onKeyPress');
    $(window).on({
      'keydown': this.onKeyPress
    });
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    this.renderScreen();
    return this;
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
    this.model.evaluateCommand(operation, symbol);
  },

  validateNumericKeyPress: function(keyValue) {
    return /^[0-9]+$/.test(keyValue)
  },

  validateOperationKeyPress: function(keyValue) {
    return /^[/*+%-=.]+$/.test(keyValue)
  },


  onKeyPress: function(event) {
    if(this.validateNumericKeyPress(event.key)){
      this.model.evaluateCommand(event.key, event.key);
    } 
    else if (event.key === 'Backspace') {
      this.model.evaluateCommand(event.key, event.key);
    }
    else if (this.validateOperationKeyPress(event.key)){
      let operation;
      switch(event.key) {
        case '+':
          operation = 'add';
          event.preventDefault();
          break;
        case '-':
          operation = 'subtract';
          event.preventDefault();
          break;
        case '/':
          operation = 'divide';
          event.preventDefault();
          break;
        case '*':
          operation = 'multiply';
          event.preventDefault();
          break;
        case '.':
          operation = 'dot';
          break;
        case '=':
          operation = 'equals';
          break;
        case '%':
          operation = 'percent';
          break;
        default:
          break;
      }
      this.model.evaluateCommand(operation, event.key);
    }
    event.preventDefault();
  }
});
