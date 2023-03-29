// const crypto = require("crypto");

// const TRIVIAL_PARTITION_KEY = "0";
// const MAX_PARTITION_KEY_LENGTH = 256;

// exports.deterministicPartitionKey = (event) => {
// 	// const TRIVIAL_PARTITION_KEY = "0";
// 	// const MAX_PARTITION_KEY_LENGTH = 256;

// 	// if (!event) return TRIVIAL_PARTITION_KEY;

// 	// let candidate = event.partitionKey || crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");

// 	// if (typeof candidate !== "string") candidate = JSON.stringify(candidate);

// 	// if (candidate.length > MAX_PARTITION_KEY_LENGTH) candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");

// 	// return candidate;

// 	let candidate = TRIVIAL_PARTITION_KEY;

// 	if (event) {
// 		if (typeof event.partitionKey === "string" && event.partitionKey.length > 0) {
// 			candidate = event.partitionKey;
// 		} else {
// 			const data = JSON.stringify(event);
// 			candidate = crypto.createHash("sha3-512").update(data).digest("hex");
// 		}
// 	}

// 	if (typeof candidate !== "string") {
// 		candidate = JSON.stringify(candidate);
// 	}

// 	if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
// 		candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
// 	}

// 	return candidate;
// };

const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const hash = crypto.createHash("sha3-512");

const deterministicPartitionKey = (event) => {
	if (!event) return TRIVIAL_PARTITION_KEY;

	const candidate = event.partitionKey || hash.update(JSON.stringify(event)).digest("hex");

	return typeof candidate === "string" && candidate.length <= MAX_PARTITION_KEY_LENGTH
		? candidate
		: crypto.createHash("sha3-512").update(candidate).digest("hex");
};

module.exports = {
	deterministicPartitionKey,
};
