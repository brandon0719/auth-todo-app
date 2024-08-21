import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8000/dashboard/todos",
    headers: {
        "Content-type": "application/json",
    },
});

async function addTodo(description) {
    const token = localStorage.getItem("token");
    try {
        const res = await http.post("/", description, {
            headers: { jwt_token: token },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

async function editTodo(description, id) {
    const token = localStorage.getItem("token");
    try {
        const res = await http.put(`/${id}`, description, {
            headers: { jwt_token: token },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

async function deleteTodo(id) {
    const token = localStorage.getItem("token");
    try {
        const res = await http.delete(`/${id}`, {
            headers: { jwt_token: token },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

const todoService = {
    addTodo: addTodo,
    editTodo: editTodo,
    deleteTodo: deleteTodo,
};

export default todoService;
