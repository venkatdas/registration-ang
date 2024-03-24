// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const fs = require('fs').promises


// const app = express();
// const port = 3000; // You can use any port that's free on your system

// app.use(cors());
// app.use(bodyParser.json());

// // Dummy endpoint for testing
// app.post("/register", (req, res) => {
//   console.log(req.body); // This will log the form data to the console
  
//   console.log("Received form data:", req.body); 
//   // Here you would add the logic to save the data to a sheet or database
//   res.status(200).send({ message: "Data received successfully" });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const fs = require("fs").promises; // Use the promise-based API of the fs module

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const DATA_FILE = "./users.json";

// app.post("/register", async (req, res) => {
//   try {
//     let users = [];
//     try {
//       const data = await fs.readFile(DATA_FILE, "utf8");
//       users = JSON.parse(data);
//     } catch (error) {
//       console.log("No existing data file, starting fresh.");
//     }

//     users.push(req.body); // Add new user
//     await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2)); // Save updated users list

//     res.status(200).send({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).send({ message: "Error saving data" });
//   }
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs").promises; // Use the promise-based API of the fs module

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./users.json";

app.post("/register", async (req, res) => {
  try {
    let users = [];
    try {
      // Attempt to read the existing data file
      const data = await fs.readFile(DATA_FILE, "utf8");
      users = JSON.parse(data);
    } catch (error) {
      // If reading the file fails, log the message and proceed with an empty list
      console.log("No existing data file, starting fresh.");
    }

    // Add the new user data to the array
    users.push(req.body);
    // Write the updated array back to the file, creating it if it doesn't exist
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));

    res.status(200).send({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ message: "Error saving data" });
  }
});



app.get("/download", (req, res) => {
   console.log("Download route was called.");
  res.download(DATA_FILE, "registered_users.json", (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
      res.status(500).send({ message: "Error downloading the file" });
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
