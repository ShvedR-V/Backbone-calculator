const operations = {
  OPERATION_ADD: "add",
  OPERATION_SUBTRACT: "subtract",
  OPERATION_MULTIPLY: "multiply",
  OPERATION_DIVIDE: "divide",
  OPERATION_PERCENT: "percent",
  OPERATION_DOT: "dot",
  OPERATION_CHANGE_SIGN: "changeSign",
  OPERATION_SQRT: "sqrt",
  OPERATION_EQUALS: "equals",
  OPERATION_ERASE: "erase",
}

const CalculatorModel = Backbone.Model.extend({
  defaults: {
    val1: '0',
    val2: '',
    operation: '',
    displayValue: '0'
  },

  isNumeric: function (value) {
    return /^-?\d+$/.test(value);
  },
  isOperation: function (value) {
    return /^[-+/*√%.=C]$/.test(value);
  },
  includesDot: function (value) {
    return /\./g.test(value);
  },

  getKey: function(operation, symbol) {
    if (this.isNumeric(operation)){
      this.setOperand(operation);
    } else {
      this.setOperation(operation, symbol);
    }
  },

  calculateResult: function() {
    let displayValue;
    switch(this.attributes.operation) {
      case operations.OPERATION_ADD:
        displayValue = parseFloat(this.attributes.val1) + parseFloat(this.attributes.val2);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
      case operations.OPERATION_SUBTRACT:
        displayValue = parseFloat(this.attributes.val1) - parseFloat(this.attributes.val2);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
      case operations.OPERATION_MULTIPLY:
        displayValue = parseFloat(this.attributes.val1) * parseFloat(this.attributes.val2);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
      case operations.OPERATION_DIVIDE:
        displayValue = parseFloat(this.attributes.val1) / parseFloat(this.attributes.val2);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
      case operations.OPERATION_SQRT:
        displayValue = parseFloat(this.attributes.val1) ** (0.5);
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
      case operations.OPERATION_PERCENT:
        displayValue = parseFloat(this.attributes.val2) *  parseFloat(this.attributes.val1) / 100;
        this.set({
          val1: displayValue,
          val2: '',
          operation: '',
          displayValue
        })
        break;
    }
  },

  setOperation: function(operation, symbol) {
    if (operation === operations.OPERATION_CHANGE_SIGN) {
      this.changeSignOperation();
      this.set({
        displayValue: this.attributes.val2
      });
      return;
    }
    if (operation === operations.OPERATION_SQRT) {
      this.attributes.operation = operation;
      this.calculateResult();
      return;
    }
    if (operation === operations.OPERATION_DOW) {
      this.addDotOperation();
      return;
    }
    if (operation === operations.OPERATION_ERASE) {
      this.eraseOperation();
      return;
    }
    if (operation === operations.OPERATION_EQUALS) {
      this.calculateResult();
      return;
    } else {
      this.attributes.operation = operation;
      this.set({
        displayValue: symbol
      });
    }
  },

  eraseOperation: function() {
    this.set({
      val1: '0',
      val2: '',
      operation: '',
      displayValue: '0',
    })
  },

  addDotOperation: function() {
    if (this.attributes.val2.length > 0) {
      if (!this.includesDot(this.attributes.val2)) {
        this.setOperand('.');
      }
    } else {
      if (!this.includesDot(this.attributes.val1)) {
        this.setOperand('.');
      }
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
      if (this.attributes.val1 === '0' && value !== '.') {
        this.attributes.val1 =  value;
      } else {
        this.attributes.val1 =  `${this.attributes.val1}${value}`;
      }
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