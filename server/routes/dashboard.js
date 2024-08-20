const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// All todos and name

router.get("/", authorization, async (req, res) => {
    try {
        //req.user has the payload
        // res.json(req.user);
        // const user = await pool.query(
        //     "SELECT user_name FROM users WHERE user_id = $1", [req.user]
        // )
        const user = await pool.query(
            "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
            [req.user.id]
        );

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// Create a todo

router.post("/todos", authorization, async (req, res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
            [req.user.id, description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// Updating a todo
router.put("/todos/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *", // $3 to make sure the user is updating their own todo
            [description, id, req.user.id]
        );
        if(updateTodo.rows.length === 0) {
            return res.json("This todo is not yours");
        }
        res.json("Todo was updated");
    } catch (error) {
        console.error(error.message);
    }
});

// Delete a todo
router.delete("/todos/:id", authorization, async (req, res) => {
    const { id } = req.params;
    const deleteTodo = await pool.query(
        "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",    // $2 to make sure the user is deleting their own todo
        [id, req.user.id]
    );
    if(deleteTodo.rows.length === 0) {
        return res.json("This todo is not yours");
    }
    res.json("Todo was deleted");
});

module.exports = router;
