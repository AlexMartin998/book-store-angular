const { writeFileSync } = require("fs");

// // to free deployment
const targetPathRedirect = "./dist/client/_redirects";
const contentFile = `
/* /index.html 200
`;
writeFileSync(targetPathRedirect, contentFile);
