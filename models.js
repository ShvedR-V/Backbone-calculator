const CalculatorModel = Backbone.Model.extend({
  defaults: {
    val1: '',
    val2: '',
    operation: '',
    result: ''
  },

  isNumeric: function (value) {
    return /^-?\d+$/.test(value);
  },
  isOperation: function (value) {
    return /^[-+/*√=]$/.test(value);
  },

  getKey: function(value) {
    if (this.isNumeric(value)){
      this.setOperand(value);
    }
    if (this.isOperation(value)){
      this.setOperation(value);
    }
  },

  calculateResult: function() {
    switch(this.attributes.operation) {
      case '+':
        this.attributes.result = parseFloat(this.attributes.val1) + parseFloat(this.attributes.val2);
        this.attributes.set({
          val1: '',
          val2: '',
          operation: ''
        })
        break
      case '-':
        this.attributes.result = parseFloat(this.attributes.val1) - parseFloat(this.attributes.val2);
        this.set({
          val1: '',
          val2: '',
          operation: ''
        })
        break
      case '*':
        this.attributes.result = parseFloat(this.attributes.val1) * parseFloat(this.attributes.val2);
        this.set({
          val1: '',
          val2: '',
          operation: ''
        })
        break
      case '/':
        this.attributes.result = parseFloat(this.attributes.val1) / parseFloat(this.attributes.val2);
        this.set({
          val1: '',
          val2: '',
          operation: ''
        })
        break
      case '√':
        this.attributes.result = parseFloat(this.attributes.val1) ** (0.5);
        this.set({
          val1: '',
          val2: '',
          operation: ''
        })
        break
    }
  },

  setOperation: function(operation) {
    if (operation === '+/-') {
      this.changeSignOperation();
    }
    if (operation === '=') {
      this.calculateResult();
    } else {
      this.attributes.operation = operation;
    }
  },

  changeSignOperation: function () {
    if (this.attributes.operation) {
      if (parseFloat(this.attributes.val2) === 0 ) {
        return 
      }
      if (parseFloat(this.attributes.val2) > 0) {
        this.attributes.val2 =  `-${this.attributes.val2}`;
      } else {
        this.attributes.val2 =  this.attributes.val2.slice(1);
      }
    } else {
      if (parseFloat(this.attributes.val1) === 0 ) {
        return 
      }
      if (parseFloat(this.attributes.val1) > 0) {
        this.attributes.val1 =  `-${this.attributes.val1}`;
      } else {
        this.attributes.val1 =  this.attributes.val1.slice(1);
      }
    }
  },

  setOperand: function(value){
    if (this.attributes.operation) {
      this.attributes.val2 =  `${this.attributes.val2}${value}`;
    } else {
      this.attributes.val1 =  `${this.attributes.val1}${value}`;
    }
  }
});

const ButtonModel = Backbone.Model.extend({
  defaults: {
    value: '',
    class: ''
  },
  click: function() {
    console.log(this.attributes.value)
  }
});