export function encode(
  port: number,
  id: number
): { error?: string; code?: string } {
  if (port < 0 || port > 65535 || id < 0 || id > 255) {
    return { error: "Invalid port or ID number." };
  }

  // Combine port and ID
  const combined = (port << 8) | id;

  // Convert to a base-36 string
  const base36 = combined.toString(36).toUpperCase();

  // Calculate checksum
  const checksum = calculateChecksum(base36);

  // Return encoded string with checksum
  return { code: base36.padStart(5, "0") + checksum };
}

export function decode(code: string): {
  error?: string;
  port?: number;
  id?: number;
} {
  if (!/^[0-9A-Z]{6}$/.test(code)) {
    return { error: "Invalid code format." };
  }

  // Extract checksum
  const checksumChar = code.slice(-1);
  const base36 = code.slice(0, 5);

  // Convert back from base-36
  const combined = parseInt(base36, 36);

  // Validate checksum
  if (checksumChar !== calculateChecksum(base36)) {
    return { error: "Invalid checksum." };
  }

  // Extract port and ID
  const port = combined >> 8;
  const id = combined & 0xff;

  return { port, id };
}

function calculateChecksum(input: string): string {
  let sum = 0;
  for (let char of input) {
    const value = char.match(/[0-9]/)
      ? parseInt(char, 10)
      : char.charCodeAt(0) - 55;
    sum += value;
  }
  const checksumValue = sum % 36;
  return checksumValue < 10
    ? checksumValue.toString()
    : String.fromCharCode(checksumValue + 55);
}

// // Example Usage
// const encoded = encode(12345, 67);
// console.log("Encoded:", encoded); // Encoded Code with Checksum

// const decoded = CodeGenerator.decode(encoded);
// console.log("Decoded:", decoded); // Original Port and ID
