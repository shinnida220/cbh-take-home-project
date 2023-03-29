const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
	it("Returns the literal '0' when given no input", () => {
		const trivialKey = deterministicPartitionKey();
		expect(trivialKey).toBe("0");
	});

	it("should return the trivial partition key when called with no event", () => {
		expect(deterministicPartitionKey()).toEqual("0");
	});

	it("should return the event's partition key when it exists", () => {
		const event = { partitionKey: "some-partition-key" };
		expect(deterministicPartitionKey(event)).toEqual("some-partition-key");
	});

	it("should hash the event when it doesn't have a partition key", () => {
		const event = { foo: "bar" };
		const hash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
		expect(deterministicPartitionKey(event)).toEqual(hash);
	});

	it("should hash the candidate when its length is greater than 256", () => {
		const event = { foo: "bar" };
		const longCandidate = "x".repeat(257);
		const hash = crypto.createHash("sha3-512").update(longCandidate).digest("hex");
		expect(deterministicPartitionKey({ ...event, partitionKey: longCandidate })).toEqual(hash);
	});
});
