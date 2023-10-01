export function add (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

// Recursive FTW!
export function factorial (number) {
  if (number === 0) {
    return 1;
  }
  return number * factorial(number - 1);
}
