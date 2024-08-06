 # Terrahacks 2024 Submission 

  ### Prerequisites

  Before you begin, ensure you have the following installed on your machine:

  - [Bun](https://bun.sh/)

  ### Installation

  Follow the steps below to set up the project:

  1. **Clone the repository:**

     ```sh
     git clone https://github.com/sunniekapar/enfra.git
     cd enfra
     ```

  2. **Set up the frontend:**

     ```sh
     bun i
     bun run dev
     ```

     Fill in the environment variables in the `.env` file.
     
     To set up the database, head to Turso and create a new database. Fill in the values in the `.env` file. Then, in the terminal, run:

     ```sh
     bun run db:push
     ```

     This will create a database for the users, session, and buildings.

  ### Running the Application

  After completing the setup, you should be able to access the frontend at [http://localhost:3000](http://localhost:3000).

  ### Video demo

  Here is a video demo of Enfra

```sh
  https://www.youtube.com/watch?v=rOtl0IIPvfo
```
