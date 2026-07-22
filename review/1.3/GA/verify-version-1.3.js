#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();

function run(command, args, cwd = root) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `Command failed with status ${result.status}: ${command} ${args.join(" ")}`
    );
  }
}

function discoverMilestoneVerifiers() {
  const reviewRoot = path.join(root, "review", "1.3");
  if (!fs.existsSync(reviewRoot)) return [];

  return fs.readdirSync(reviewRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^A/i.test(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .flatMap((entry) => {
      const directory = path.join(reviewRoot, entry.name);
      return fs.readdirSync(directory)
        .filter((name) => /^verify.*\.js$/i.test(name))
        .sort()
        .map((name) => path.join(directory, name));
    });
}

for (const verifier of discoverMilestoneVerifiers()) {
  run("node", [verifier]);
}

const gaVerifiers = [
  "verify-release-structure.js",
  "verify-organisation-exports.js",
  "verify-organisation-navigation.js",
  "verify-unavailable-states.js",
];

for (const verifier of gaVerifiers) {
  run("node", [path.join(root, "review", "1.3", "GA", verifier)]);
}

const rootPackage = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8")
);

if (rootPackage.scripts && rootPackage.scripts["verify:staffology"]) {
  run("npm", ["run", "verify:staffology"]);
}

const frontend = path.join(
  root,
  "products",
  "tax-payroll",
  "frontend"
);

if (!fs.existsSync(path.join(frontend, "package.json"))) {
  throw new Error("Frontend package.json not found");
}

run("npm", ["run", "build"], frontend);

console.log("\nVersion 1.3 Staffology Organisation Foundation GA passed");
