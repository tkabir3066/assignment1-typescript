# How `Pick` and `Omit` Prevent Code Duplication in TypeScript

In TypeScript, `Pick` and `Omit` are utility types used to create smaller and specialized versions of a larger interface without rewriting code. This helps keep the code **DRY (Don't Repeat Yourself)**.

---

# 1. `Pick` Utility Type

`Pick` creates a new type by selecting specific properties from an existing interface.

## Example

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserProfile = Pick<User, "id" | "name" | "email">;
```

Here, `UserProfile` only contains:

```ts
{
  id: number;
  name: string;
  email: string;
}
```

Instead of creating a new interface manually, we reuse properties from `User`.

---

# 2. `Omit` Utility Type

`Omit` creates a new type by removing specific properties from an existing interface.

## Example

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type SafeUser = Omit<User, "password">;
```

Now `SafeUser` contains everything except `password`.

---

# 3. How They Prevent Code Duplication

Without `Pick` and `Omit`, developers would need to write similar interfaces repeatedly.

## Without Utility Types

```ts
interface UserProfile {
  id: number;
  name: string;
  email: string;
}
```

This duplicates code from the `User` interface.

If the original `User` interface changes later, developers must manually update all related interfaces, which increases maintenance work and chances of errors.

Using `Pick` and `Omit` solves this problem because all specialized types automatically stay connected to the main interface.

---

# 4. How This Keeps Code DRY

The DRY principle means avoiding repeated code.

`Pick` and `Omit` help by:

- Reusing existing interfaces
- Reducing repeated property definitions
- Making code easier to maintain
- Keeping types consistent across the project
- Reducing bugs caused by mismatched interfaces

---

# Conclusion

`Pick` and `Omit` allow developers to create specialized “slices” of a master interface without rewriting properties. This prevents code duplication, improves maintainability, and follows the DRY principle by keeping the code clean, reusable, and consistent.
