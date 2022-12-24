const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

test.skip("password is successfully hashed and compared", async () => {
  const plaintextPW = "v84inf0j3nf8fe";
  const hashedPassword = await bcrypt.hash(plaintextPW, 10);
  expect(hashedPassword).not.toBe(plaintextPW);

  const match = await bcrypt.compare(plaintextPW, hashedPassword);
  expect(match).toBe(true);
});

test.skip("jwt token can be successfully extracted", async () => {
  const secret = "83f94jfd3f73f";
  const token = jwt.sign({ user: "Kerron", id: 1234 }, secret);
  const decodedToken = jwt.verify(token, secret);
  expect(decodedToken.id).toBe(1234);
});

test("using an invalid secret return the correct error", async () => {
  const secret = "83f94jfd3f73f";
  const token = jwt.sign({ user: "Kerron", id: 1234 }, secret);
  try {
    jwt.verify(token, "invalidSecret");
  } catch (error) {
    expect(error.name).toBe("JsonWebTokenError");
  }
});
