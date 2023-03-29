const crypto = require("crypto");

/**
 * Lets moves these TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH
 * outside of the function since they do not change and
 * can be reused across multiple function calls.
 */
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const deterministicPartitionKey = (event) => {
	// Instead of the nested if, if there is no event, then we can just return the TRIVIAL_PARTITION_KEY
	if (!event) return TRIVIAL_PARTITION_KEY;

	// I am merging the two if statements that check if candidate exists
	// and if it is a string into a single conditional statement.
	// I am also doing the candidate assignment immediately
	let candidate = event.partitionKey || crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");

	if (typeof candidate !== "string") {
		candidate = JSON.stringify(candidate);
	}

	// If we have candidate as string and its length is less/= MAX_PARTITION_KEY_LENGTH,
	// just return it,
	// else, hash the candidate and return a hex version of it
	return candidate.length <= MAX_PARTITION_KEY_LENGTH ? candidate : crypto.createHash("sha3-512").update(candidate).digest("hex");
};

module.exports = {
	deterministicPartitionKey,
};
