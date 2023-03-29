# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Below is a summary of the changes I made to the original function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality:

1. I removed the let declaration for candidate at the top. This is because it's declaration and initialization can be done in one step using

```
    let candidate = event.partitionKey || hash.update(JSON.stringify(event)).digest("hex");
```

With this change, I was able to eliminate unnecessary lines of code and this made the code more concise.

2. I combined the two if statements that check if candidate is not a string into one if statement that checks if typeof candidate !== "string". This is simpler and easier to read than having two separate if statements.

3. I then moved the check for candidate.length > MAX_PARTITION_KEY_LENGTH to the end of the function and used a ternary operator to determine whether to return candidate or the hashed value of candidate. Doing this eliminated unnecessary lines of code and makes the function more concise and easier to read.

4. Finally, I moved the constants TRIVIAL_PARTITION_KEY and MAX_PARTITION_KEY_LENGTH outside of the function so they can be reused across multiple function calls. This helped to eliminate the need to recreate these constants every time the function is called, making the code more efficient.

To summarize, I do believe the refactored code is more readable because it eliminates unnecessary lines of code, simplifies the logic, and makes much better use of constants.
