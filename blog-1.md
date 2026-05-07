# Why `any` is Called a "Type Safety Hole" and Why `unknown` is Safer in TypeScript

TypeScript’s main purpose is to provide **type safety**.

Type safety means:

- Catching errors before runtime
- Ensuring correct data types
- Helping developers with autocomplete and validation

However, the `any` type disables all these protections.

---

# What is `any` in TypeScript?

When a variable is typed as `any`, TypeScript basically says:

> "I trust you completely. Do whatever you want."

That is why `any` is called a:

> **Type Safety Hole**

because it creates a hole in TypeScript’s safety system.

---

# Example of `any`

```ts
let value: any = "Hello";

console.log(value.toUpperCase()); // Works

value = 123;

console.log(value.toUpperCase()); // Runtime Error
```

---

# What Happened Here?

TypeScript allowed this:

```ts
value.toUpperCase();
```

even though `value` became a number.

Why?

Because `any` disables type checking completely.

So TypeScript could not protect us.

---

# Problems with `any`

Using `any` causes several issues.

---

## 1. No Type Checking

```ts
let data: any = 10;

data(); // No error from TypeScript
```

But numbers are not functions.

This crashes at runtime.

---

## 2. No Autocomplete Safety

```ts
let user: any = {
  name: "John",
};

console.log(user.nam);
```

TypeScript will not warn you about the typo (`nam`).

---

## 3. Errors Spread Everywhere

`any` is contagious.

```ts
let value: any = "Hello";

let newValue = value;
```

Now `newValue` also behaves like `any`.

Type safety starts disappearing across the codebase.

---

# Why `unknown` is Safer

`unknown` was introduced as a safer alternative to `any`.

Think of `unknown` as:

> "I don’t know the type yet, so you must check it first."

Unlike `any`, TypeScript does NOT allow unsafe operations on `unknown`.

---

# Example of `unknown`

```ts
let value: unknown = "Hello";

console.log(value.toUpperCase());
```

This gives an error:

```ts
Object is of type 'unknown'
```

TypeScript protects us.

---

# Why is This Safer?

Because before using the value, we must verify its type.

Example:

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

Now it works safely.

---

# Key Difference Between `any` and `unknown`

| Feature                   | `any`       | `unknown`  |
| ------------------------- | ----------- | ---------- |
| Type checking             | ❌ Disabled | ✅ Enabled |
| Unsafe operations allowed | ✅ Yes      | ❌ No      |
| Must verify type first    | ❌ No       | ✅ Yes     |
| Safer for APIs/user input | ❌ No       | ✅ Yes     |

---

# Real-World Example

Suppose data comes from an API.

We do not fully trust external data.

---

## Using `any`

```ts
const response: any = JSON.parse(data);

console.log(response.user.name.toUpperCase());
```

Dangerous.

If `user` or `name` does not exist, the app crashes.

---

## Using `unknown`

```ts
const response: unknown = JSON.parse(data);

if (typeof response === "object" && response !== null && "user" in response) {
  console.log(response);
}
```

Much safer.

---

# What is Type Narrowing?

Type narrowing means:

> Reducing a broad type into a more specific type.

TypeScript uses checks to “narrow” the possible type.

---

# Example

```ts
let value: string | number;
```

This variable could be:

- string
- number

We narrow it using conditions.

---

# Narrowing with `typeof`

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

---

# What TypeScript Understands

Inside:

```ts
typeof value === "string";
```

TypeScript narrows:

```ts
value → string
```

So string methods become safe.

Inside `else`:

```ts
value → number
```

So number methods become safe.

---

# Common Type Narrowing Techniques

---

# 1. `typeof`

Used for primitive types.

```ts
typeof value === "string";
typeof value === "number";
typeof value === "boolean";
```

---

# 2. `instanceof`

Used with classes.

```ts
class Dog {
  bark() {}
}

class Cat {
  meow() {}
}

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

---

# 3. `in` Operator

Checks object properties.

```ts
type Admin = {
  role: string;
};

type User = {
  name: string;
};

function print(person: Admin | User) {
  if ("role" in person) {
    console.log(person.role);
  } else {
    console.log(person.name);
  }
}
```

---

# 4. Truthiness Narrowing

```ts
function printLength(value: string | null) {
  if (value) {
    console.log(value.length);
  }
}
```

TypeScript removes `null`.

---

# 5. Custom Type Guards

You can create your own narrowing logic.

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function print(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

---

# Why Type Narrowing is Important

Without narrowing:

```ts
function print(value: string | number) {
  value.toUpperCase();
}
```

Error:

```ts
Property 'toUpperCase' does not exist on type 'string | number'
```

Because TypeScript is unsure whether it’s a string or number.

Narrowing removes that uncertainty.

---

# Best Practice

## Avoid `any` whenever possible.

Use:

- `unknown`
- union types
- generics
- proper interfaces

instead.

---

# Recommended Rule

## Use `any` only when:

- Migrating old JavaScript code
- Quick prototyping
- Absolutely unavoidable situations

---

# Use `unknown` when:

- Handling API responses
- Parsing JSON
- Receiving user input
- Working with third-party libraries
- Dealing with unpredictable data

---

# Simple Analogy

## `any`

Like giving someone full access to your system without verification.

---

## `unknown`

Like checking identity before granting access.

---

# Final Summary

| Concept         | Explanation                                                |
| --------------- | ---------------------------------------------------------- |
| `any`           | Disables TypeScript safety completely                      |
| Why dangerous   | Allows invalid operations without errors                   |
| `unknown`       | Safer unknown type                                         |
| Why safer       | Requires type checking before usage                        |
| Type Narrowing  | Process of refining a broad type into a specific type      |
| Narrowing tools | `typeof`, `instanceof`, `in`, truthy checks, custom guards |
