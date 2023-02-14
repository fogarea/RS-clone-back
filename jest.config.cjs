/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }
};
