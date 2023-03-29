const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
	// Default test
	it("Returns the literal '0' when given no input", () => {
		const trivialKey = deterministicPartitionKey();
		expect(trivialKey).toBe("0");
	});

	// Other tests
	it("It should return the event's partition key when it exists", () => {
		const partitionKey = "SamplePartitionKey";
		const event = { partitionKey };
		expect(deterministicPartitionKey(event)).toEqual(partitionKey);
	});

	it("It should hash the candidate when its length is greater than 256", () => {
		const event = { username: "john.doe@gmail.com" };
		const longCandidate = "x".repeat(257);
		const hash = crypto.createHash("sha3-512").update(longCandidate).digest("hex");
		expect(deterministicPartitionKey({ ...event, partitionKey: longCandidate })).toEqual(hash);
	});

	it("It should hash the event when it doesn't have a partition key", () => {
		const event = { username: "john.doe@gmail.com" };
		const hash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
		expect(deterministicPartitionKey(event)).toEqual(hash);
	});

	it("It should return a string even when the input candidate is not a string", () => {
		const event = { id: 1, name: "John Doe" };
		const candidate = { id: 1, name: "John Doe" };
		expect(typeof deterministicPartitionKey({ ...event, partitionKey: candidate })).toEqual("string");
	});
});

// describe("deterministicPartitionKeyRefactored", () => {
// 	// Default test
// 	it("Returns the literal '0' when given no input", () => {
// 		const trivialKey = deterministicPartitionKeyRefactored();
// 		expect(trivialKey).toBe("0");
// 	});

// 	it("It should return the event's partition key when it exists", () => {
// 		const partitionKey = "SamplePartitionKey";
// 		const event = { partitionKey };
// 		expect(deterministicPartitionKeyRefactored(event)).toEqual(partitionKey);
// 	});

// 	it("It should hash the candidate when its length is greater than 256", () => {
// 		const event = { username: "john.doe@gmail.com" };
// 		const longCandidate = "x".repeat(257);
// 		const hash = crypto.createHash("sha3-512").update(longCandidate).digest("hex");
// 		expect(deterministicPartitionKeyRefactored({ ...event, partitionKey: longCandidate })).toEqual(hash);
// 	});

// 	it("It should hash the event when it doesn't have a partition key", () => {
// 		const event = { username: "john.doe@gmail.com" };
// 		const hash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
// 		expect(deterministicPartitionKeyRefactored(event)).toEqual(hash);
// 	});

// 	it("It should return a string even when the input candidate is not a string", () => {
// 		const event = { id: 1, name: "John Doe" };
// 		const candidate = { id: 1, name: "John Doe" };
// 		expect(typeof deterministicPartitionKeyRefactored({ ...event, partitionKey: candidate })).toEqual("string");
// 	});
// });
