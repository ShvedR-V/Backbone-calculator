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
  OPERATION_MEMORY_ADD: "memoryAdd",
  OPERATION_MEMORY_SUBTRACT: "memorySubtract",
  OPERATION_MEMORY_RECALL: "memoryRecall",
  OPERATION_UNDO: "undo",
}

const CalculatorModel = Backbone.Model.extend({
  defaults: {
    val1: '0',
    val2: '',
    operation: '',
    symbol: '',
    displayValue: '0',
    memoryValue: '0',
    actions: []
  },
  cache: [],

  addToCache: function() {
    this.cache.push({...this.attributes});
  },

  applyFromCache: function() {
    this.set({
      ...this.cache.pop()
    });
  },

  normalizeResult: function(result) {
    return (Math.round(result * 1000000000000000) / 1000000000000000).toString()
  },

  isNumeric: function (value) {
    return /^-?\d+$/.test(value);
  },
  includesDot: function (value) {
    return /\./g.test(value);
  },

  getKey: function(operation, symbol) {
    if (operation === operations.OPERATION_UNDO) {
      this.applyFromCache();
    } else {
      this.addToCache();
      if (this.isNumeric(operation)){
        this.setOperand(operation);
      } else {
        this.setOperation(operation, symbol);
      }
    }
  },

  addResultToActions: function(result) {
    return [
      ...this.attributes.actions, 
      {
        calculation: `${this.attributes.val1} ${this.attributes.symbol} ${this.attributes.val2}`,
        result
      }
    ]
  },

  setCalculatedValue: function(displayValue, actions) {
    this.set({
      val1: displayValue,
      val2: '',
      operation: '',
      displayValue,
      actions
    })
  },

  calculateResult: function() {
    let displayValue;
    let actions;
    switch(this.attributes.operation) {
      case operations.OPERATION_ADD:
        displayValue = this.normalizeResult(parseFloat(this.attributes.val1) + parseFloat(this.attributes.val2));
        actions = this.addResultToActions(displayValue),
        this.setCalculatedValue(displayValue, actions);
        break;
      case operations.OPERATION_SUBTRACT:
        displayValue = this.normalizeResult(parseFloat(this.attributes.val1) - parseFloat(this.attributes.val2));
        actions = this.addResultToActions(displayValue),
        this.setCalculatedValue(displayValue, actions);
        break;
      case operations.OPERATION_MULTIPLY:
        displayValue = this.normalizeResult(parseFloat(this.attributes.val1) * parseFloat(this.attributes.val2));
        actions = this.addResultToActions(displayValue),
        this.setCalculatedValue(displayValue, actions);
        break;
      case operations.OPERATION_DIVIDE:
        displayValue = this.normalizeResult(parseFloat(this.attributes.val1) / parseFloat(this.attributes.val2));
        actions = this.addResultToActions(displayValue),
        this.setCalculatedValue(displayValue, actions);
        break;
      case operations.OPERATION_SQRT:
        displayValue = this.normalizeResult(parseFloat(this.attributes.val1) ** (0.5));
        actions = this.addResultToActions(displayValue),
        this.setCalculatedValue(displayValue, actions);
        break;
      case operations.OPERATION_PERCENT:
        displayValue = this.normalizeResult(parseFloat(this.attributes.val2) *  parseFloat(this.attributes.val1) / 100);
        actions = this.addResultToActions(displayValue),
        this.setCalculatedValue(displayValue, actions);
        break;
    }
  },

  setOperation: function(operation, symbol) {
    if (operation === operations.OPERATION_CHANGE_SIGN) {
      this.changeSignOperation();
      return;
    }
    if (operation === operations.OPERATION_MEMORY_ADD) {
      this.addToMemory();
      return;
    }
    if (operation === operations.OPERATION_UNDO) {
      this.applyFromCache();
      return;
    }
    if (operation === operations.OPERATION_MEMORY_SUBTRACT) {
      this.subtractFromMemory();
      return;
    }
    if (operation === operations.OPERATION_MEMORY_RECALL) {
      this.recallFromMemory();
      return;
    }
    if (operation === operations.OPERATION_SQRT) {
      this.attributes.symbol = symbol;
      if (this.attributes.operation) {
        this.calculateResult();
        this.attributes.operation = operation;
      } else {
        this.attributes.operation = operation;
        this.calculateResult();
      }
      return;
    }
    if (operation === operations.OPERATION_DOT) {
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
      this.attributes.symbol = symbol;
      if (this.attributes.operation) {
        this.calculateResult();
        this.attributes.operation = operation;
      } else {
        this.attributes.operation = operation;
      }
    }
  },
  addToMemory: function() {
    if (this.attributes.val2.length > 0) {
      const memoryValue = parseFloat(this.attributes.memoryValue) +  parseFloat(this.attributes.val2)
      this.set({
        memoryValue,
        actions: [
          ...this.attributes.actions, 
          {
            calculation: `Memory: ${this.attributes.memoryValue} + ${this.attributes.val2}`,
            result: memoryValue
          }
        ]
      })

    } else {
      const memoryValue = parseFloat(this.attributes.memoryValue) +  parseFloat(this.attributes.val1)
      this.set({
        memoryValue,
        actions: [
          ...this.attributes.actions, 
          {
            calculation: `Memory: ${this.attributes.memoryValue} + ${this.attributes.val1}`,
            result: memoryValue
          }
        ]
      })
    }
  },

  subtractFromMemory: function() {
    if (this.attributes.val2.length > 0) {
      const  memoryValue = parseFloat(this.attributes.memoryValue) -  parseFloat(this.attributes.val2)
      this.set({
        memoryValue,
        actions: [
          ...this.attributes.actions, 
          {
            calculation: `Memory: ${this.attributes.memoryValue} - ${this.attributes.val1}`,
            result: memoryValue
          }
        ]
      })
      
    } else {
      const memoryValue  = parseFloat(this.attributes.memoryValue) -  parseFloat(this.attributes.val1)
      this.set({
        memoryValue,
        actions: [
          ...this.attributes.actions, 
          {
            calculation: `Memory: ${this.attributes.memoryValue} - ${this.attributes.val1}`,
            result: memoryValue
          }
        ]
      })
    }
  },

  recallFromMemory: function() {
    this.set({
      displayValue: this.attributes.memoryValue,
      val1: this.attributes.memoryValue,
      val2: '',
      operation: '',
      memoryValue: '0',
      actions: [
        ...this.attributes.actions, 
        {
          calculation: `Recalled from memory: ${this.attributes.memoryValue}`,
          result: ''
        }
      ]
    })
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
        this.set({
          val2: `-${this.attributes.val2}`,
          displayValue:  `-${this.attributes.val2}`,
        })
      } else {
        this.set({
          val2: `-${this.attributes.val2.slice(1)}`,
          displayValue:  `-${this.attributes.val2.slice(1)}`,
        })
      }
    } else {
      if (parseFloat(this.attributes.val1) === 0 ) {
        return 
      }
      if (parseFloat(this.attributes.val1) > 0) {
        this.set({
          val1: `-${this.attributes.val1}`,
          displayValue:  `-${this.attributes.val1}`,
        })
      } else {
        this.set({
          val1: this.attributes.val1.slice(1),
          displayValue: this.attributes.val1.slice(1),
        })
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
