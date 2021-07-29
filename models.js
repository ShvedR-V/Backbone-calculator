const CalculatorModel = Backbone.Model.extend({
  defaults: {
    val1: '',
    val2: '',
    operation: '',
    displayValue: ''
  },

  isNumeric: function (value) {
    return /^-?\d+$/.test(value);
  },
  isOperation: function (value) {
    return /^[-+/*√=C]$/.test(value);
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
    let displayValue;
    switch(this.attributes.operation) {
      case '+':
        displayValue = parseFloat(this.attributes.val1) + parseFloat(this.attributes.val2);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
      case '-':
        displayValue = parseFloat(this.attributes.val1) - parseFloat(this.attributes.val2);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
      case '*':
        displayValue = parseFloat(this.attributes.val1) * parseFloat(this.attributes.val2);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
      case '/':
        displayValue = parseFloat(this.attributes.val1) / parseFloat(this.attributes.val2);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
      case '√':
        displayValue = parseFloat(this.attributes.val1) ** (0.5);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
    }
  },

  setOperation: function(operation) {
    if (operation === '+/-') {
      this.changeSignOperation();
      this.set({
        displayValue: this.attributes.val2
      });
    }
    if (operation === '=') {
      this.calculateResult();
    } else {
      this.attributes.operation = operation;
      this.set({
        displayValue: this.attributes.operation
      });
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
      this.set({
        displayValue: this.attributes.val2
      });
    } else {
      this.attributes.val1 =  `${this.attributes.val1}${value}`;
      this.set({
        displayValue: this.attributes.val1
      });
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