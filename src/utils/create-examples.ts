interface Example {
  id: number
  expression: string
  answer: number
}

let exampleId = 1 // ~ глобальный счетчик для уникальных id

function generateExpression(level: number, numVariables: number): Example {
  const operators = level === 1 ? ['+', '-'] : ['+', '-', '*', '/'] // ~ для первого уровня только + и -
  const numbers: number[] = []
  const ops: string[] = []

  // ~ генерация чисел
  for (let i = 0; i < numVariables; i++) {
    const maxNumber = level === 1 ? 50 : 100 // ~ для первого уровня числа до 50
    const a = Math.floor(Math.random() * maxNumber) + 1
    numbers.push(a)
  }

  // ~ генерация операторов
  for (let i = 0; i < numVariables - 1; i++) {
    const operator = operators[Math.floor(Math.random() * operators.length)]
    ops.push(operator)
  }

  // ~ сборка выражения
  let expression = numbers[0].toString()
  for (let i = 0; i < ops.length; i++) {
    expression += ` ${ops[i]} ${numbers[i + 1]}`
  }

  // ~ вычисление результата с учетом приоритета операций
  const result = calculateResult(numbers, ops)

  if (result < 0 || !Number.isInteger(result) || result > 100) {
    return generateExpression(level, numVariables) // ~ создаем новое выражение если оно не удовлетворяет условия
  }

  // ~ возвращаем объект с id, выражением и ответом
  return {
    id: exampleId++,
    expression: `${expression} = `,
    answer: result,
  }
}

function calculateResult(numbers: number[], ops: string[]): number {
  // ~ сначала вычисляем умножение и деление
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === '*' || ops[i] === '/') {
      const a = numbers[i]
      const b = numbers[i + 1]
      let result: any

      if (ops[i] === '*') {
        result = a * b
      }
      else if (ops[i] === '/') {
        if (b === 0 || a % b !== 0) {
          return Number.NaN // ~ если деление на 0 или нецелое, то пропускаем
        }
        result = a / b
      }

      // ~ проверка промежуточного результата
      if (result > 100) {
        return Number.NaN // ~ перегенерируем выражение, если результат > 100
      }

      // ~ заменяем два числа и оператор на результат
      numbers.splice(i, 2, result)
      ops.splice(i, 1)
      i-- // ~ корректируем индекс после удаления элемента
    }
  }

  // ~ вычисляем сложение и вычитание
  let result = numbers[0]
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === '+') {
      result += numbers[i + 1]
    }
    else if (ops[i] === '-') {
      result -= numbers[i + 1]
    }
  }

  return result
}

function generateExamples(level: number): Example[] {
  const examples: Example[] = []
  const numVariables = level === 1 ? 2 : Math.floor(Math.random() * 2) + 3 // ~ для первого уровня 2 числа, для остальных 3-4

  while (examples.length < 10) {
    const example = generateExpression(level, numVariables)
    examples.push(example)
  }

  return examples
}

export function generateMathExamples(level: number): Example[] {
  switch (level) {
    case 1:
      return generateExamples(1)
    case 2:
      return generateExamples(2)
    case 3:
      return generateExamples(3)
    default:
      return []
  }
}
