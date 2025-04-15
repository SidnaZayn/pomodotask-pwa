import { ref } from 'vue';
import { defineStore } from 'pinia';

const LOCAL_STORAGE_KEY = 'todo-list';
const EXPIRATION_KEY = 'todo-list-expiration';

const saveToLocalStorage = (todos) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration to 7 days
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    localStorage.setItem(EXPIRATION_KEY, expirationDate.toISOString());
};

const loadFromLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const expiration = localStorage.getItem(EXPIRATION_KEY);

    if (expiration && new Date(expiration) < new Date()) {
        // If expired, clear localStorage and return an empty array
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(EXPIRATION_KEY);
        return [];
    }

    return todos;
};

export const useTodoStore = defineStore('todo', () => {
    const todos = ref(loadFromLocalStorage());

    const addTodo = (text) => {
        if (text.trim()) {
            todos.value.push({ id: Date.now(), text, completed: false });
            saveToLocalStorage(todos.value);
        }
    };

    const toggleTodo = (id) => {
        const todo = todos.value.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            saveToLocalStorage(todos.value);
        }
    };

    const removeTodo = (id) => {
        todos.value = todos.value.filter((todo) => todo.id !== id);
        saveToLocalStorage(todos.value);
    };

    const editTodo = (id, newText) => {
        const todo = todos.value.find((todo) => todo.id === id);
        if (todo) {
            todo.text = newText;
            saveToLocalStorage(todos.value);
        }
    };
    return {
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
        editTodo,
    };
});