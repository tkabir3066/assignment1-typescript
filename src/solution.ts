//problem-1

const filterEvenNumbers = (numbers: number[]): number[] => {
  return numbers.filter((num) => num % 2 === 0);
};

const result1 = filterEvenNumbers([1, 2, 3, 4, 5, 6]);

//problem-2

const reverseString = (text: string): string => {
  return text.split("").reverse().join("");
};

const result2 = reverseString("typescript");

//problem-3

type StringOrNumber = string | number;

const checkType = (input: StringOrNumber): StringOrNumber => {
  if (typeof input === "string") {
    return "String";
  } else {
    return "Number";
  }
};

// const result3 = checkType("Hello");
const result3 = checkType(23);

//problem-4

const getProperty = <X>(obj: X, key: keyof X) => {
  return obj[key];
};

const user = { id: 1, name: "John Doe", age: 21 };
const result4 = getProperty(user, "name");
console.log(result4);
