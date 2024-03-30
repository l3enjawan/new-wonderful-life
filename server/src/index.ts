import "reflect-metadata";
import { createConnection } from "typeorm";
import ormConfig from "./ormconfig";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { User } from "./entities/user";
import bcrypt from "bcryptjs";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

createConnection(ormConfig)
  .then(async (connection) => {
    console.log("Database connected successfully");

    // Registration endpoint
    app.post("/register", async (req: Request, res: Response) => {
      try {
        // Destructure the body content
        const { firstName, lastName, email, password } = req.body;

        // Validate the request body
        if (!(email && password && firstName && lastName)) {
          return res.status(400).send("All input is required");
        }

        // Check if user already exists
        const userRepository = connection.getRepository(User);
        const existingUser = await userRepository.findOneBy({ email: email });
        if (existingUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email.toLowerCase(); // normalize email
        user.password = encryptedPassword;

        const newUser = await userRepository.save(user);

        // Return the newly created user
        return res.status(201).json(newUser);
      } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).send("Internal Server Error");
      }
    });

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
    process.exit(1);
  });
