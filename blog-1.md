# Why is `any` Called a "Type Safety Hole" and Why is `unknown` Safer in TypeScript?

In TypeScript, `any` is called a **"type safety hole"** because it completely disables TypeScript’s type checking. When a variable is typed as `any`, you can perform any operation on it without getting errors, even if the operation is invalid.

This removes the main benefit of TypeScript — **type safety** — and can lead to runtime bugs.

---

## Example of `any`

```ts
let value: any = "Hello";

value.toUpperCase(); // Works

value = 10;

value.toUpperCase(); // No TypeScript error, but causes runtime error
```

Here, TypeScript does not check whether `toUpperCase()` is valid for a number.

As a result, the code compiles successfully, but it may crash during runtime.

---

# Why is `unknown` Safer?

`unknown` is safer because it forces developers to verify the type before using the value.

TypeScript does not allow operations directly on an `unknown` type until the type is checked.

---

## Example of `unknown`

```ts
let value: unknown = "Hello";

value.toUpperCase(); // Error
```

TypeScript shows an error because it does not know whether `value` is actually a string.

Before using it, we must check the type.

---

## Type Checking with `unknown`

```ts
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

Now TypeScript knows that `value` is a string inside the `if` block.

This process is called **type narrowing**.

---

# What is Type Narrowing?

Type narrowing means converting a broad type into a more specific type using conditions.

TypeScript narrows the type after checking it.

Common ways of narrowing types:

- `typeof`
- `instanceof`
- `in` operator
- Custom type guards

---

## Example of Type Narrowing

```ts
function print(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

Inside the `if` block, TypeScript narrows `value` from `unknown` to `string`.

---

# Difference Between `any` and `unknown`

| `any`                    | `unknown`                    |
| ------------------------ | ---------------------------- |
| Disables type checking   | Keeps type safety            |
| Allows all operations    | Requires type checking first |
| Can cause runtime errors | Prevents unsafe operations   |
| Unsafe                   | Safer                        |

---

# Conclusion

- `any` removes type safety and allows unsafe operations.
- `unknown` keeps type safety by forcing type checks.
- Type narrowing helps TypeScript identify the exact type before performing operations.

Therefore, `unknown` is the safer choice for handling unpredictable data in TypeScript.

```

```
