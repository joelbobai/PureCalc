export type Operator = '+' | '-' | '×' | '÷';
export type ActionType =
  | 'digit'
  | 'decimal'
  | 'operator'
  | 'equals'
  | 'clear'
  | 'backspace';

export type CalculatorState = {
  expression: string;
  currentInput: string;
  previousValue: number | null;
  operator: Operator | null;
  result: string;
  error: boolean;
  lastAction: ActionType;
};

export const initialState: CalculatorState = {
  expression: '',
  currentInput: '0',
  previousValue: null,
  operator: null,
  result: '',
  error: false,
  lastAction: 'clear',
};

const formatNumber = (value: number): string => {
  if (!Number.isFinite(value)) {
    return 'Error';
  }
  const fixed = value.toString();
  return fixed;
};

const compute = (left: number, right: number, operator: Operator): number => {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '×':
      return left * right;
    case '÷':
      if (right === 0) {
        return Number.NaN;
      }
      return left / right;
    default:
      return right;
  }
};

const normalizeInput = (value: string): number => {
  if (value === '' || value === '.') {
    return 0;
  }
  return Number.parseFloat(value);
};

export const getDisplayValue = (state: CalculatorState): string => {
  if (state.error) {
    return 'Error';
  }
  if (state.lastAction === 'equals' && state.result) {
    return state.result;
  }
  return state.currentInput || (state.previousValue !== null ? formatNumber(state.previousValue) : '0');
};

export const getExpression = (state: CalculatorState): string => {
  if (state.error) {
    return 'Divide by zero';
  }
  return state.expression;
};

export const handleInput = (state: CalculatorState, input: string): CalculatorState => {
  if (state.error && input !== 'C') {
    return state;
  }

  if (input === 'C') {
    return { ...initialState, lastAction: 'clear' };
  }

  if (input === '⌫') {
    if (state.lastAction === 'equals') {
      return { ...initialState, lastAction: 'backspace' };
    }
    const updated = state.currentInput.length > 1
      ? state.currentInput.slice(0, -1)
      : '0';
    return {
      ...state,
      currentInput: updated,
      lastAction: 'backspace',
    };
  }

  if (input === '=') {
    if (!state.operator) {
      return { ...state, lastAction: 'equals' };
    }
    const left = state.previousValue ?? 0;
    const right = normalizeInput(state.currentInput);
    const computed = compute(left, right, state.operator);
    if (!Number.isFinite(computed)) {
      return {
        ...state,
        error: true,
        result: 'Error',
        expression: `${left} ${state.operator} ${right}`,
        lastAction: 'equals',
      };
    }
    const formatted = formatNumber(computed);
    return {
      ...state,
      previousValue: computed,
      currentInput: formatted,
      result: formatted,
      expression: `${left} ${state.operator} ${right}`,
      operator: null,
      lastAction: 'equals',
    };
  }

  if (input === '.') {
    if (state.lastAction === 'equals') {
      return {
        ...state,
        currentInput: '0.',
        previousValue: null,
        operator: null,
        result: '',
        expression: '',
        lastAction: 'decimal',
      };
    }
    if (state.currentInput.includes('.')) {
      return state;
    }
    return {
      ...state,
      currentInput: `${state.currentInput}.`,
      lastAction: 'decimal',
    };
  }

  if (['+', '-', '×', '÷'].includes(input)) {
    const operator = input as Operator;
    if (state.lastAction === 'operator') {
      return {
        ...state,
        operator,
        expression: state.previousValue !== null ? `${formatNumber(state.previousValue)} ${operator}` : '',
        lastAction: 'operator',
      };
    }
    const currentValue = normalizeInput(state.currentInput);
    if (state.previousValue === null) {
      return {
        ...state,
        previousValue: currentValue,
        operator,
        expression: `${formatNumber(currentValue)} ${operator}`,
        currentInput: '',
        lastAction: 'operator',
      };
    }
    const computed = state.operator
      ? compute(state.previousValue, currentValue, state.operator)
      : currentValue;
    if (!Number.isFinite(computed)) {
      return {
        ...state,
        error: true,
        result: 'Error',
        expression: `${formatNumber(state.previousValue)} ${state.operator ?? ''} ${currentValue}`.trim(),
        lastAction: 'operator',
      };
    }
    return {
      ...state,
      previousValue: computed,
      operator,
      expression: `${formatNumber(computed)} ${operator}`,
      currentInput: '',
      result: formatNumber(computed),
      lastAction: 'operator',
    };
  }

  if (/^[0-9]$/.test(input)) {
    if (state.lastAction === 'equals') {
      return {
        ...state,
        currentInput: input,
        previousValue: null,
        operator: null,
        result: '',
        expression: '',
        lastAction: 'digit',
      };
    }
    const updated = state.currentInput === '0' ? input : `${state.currentInput}${input}`;
    return {
      ...state,
      currentInput: updated,
      lastAction: 'digit',
    };
  }

  return state;
};
