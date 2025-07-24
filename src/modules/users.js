const fs = require("fs");
const path = require("path");

function getUsers() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "../../data", "users.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject({
          status: 500,
          message: "Internal Server Error: Could not read users file",
        });
      }
      try {
        const users = JSON.parse(data);
        resolve({ status: 200, data: users });
      } catch (parseError) {
        console.error("Error parsing JSON from users.json:", parseError);
        reject({
          status: 500,
          message: "Internal Server Error: Invalid users JSON format",
        });
      }
    });
  });
}

module.exports = { getUsers };
