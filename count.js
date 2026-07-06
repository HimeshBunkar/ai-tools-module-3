const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\hp5cd\\.gemini\\antigravity\\brain\\fb54a93e-3bb4-4aa3-9766-d449ae0d7122\\.system_generated\\steps\\789\\content.md', 'utf8');

// Count occurrences of role="listitem" in the live HTML
const regex = /role="listitem"/g;
const matches = content.match(regex);
console.log("COUNT:", matches ? matches.length : 0);
