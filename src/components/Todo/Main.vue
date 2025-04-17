<script setup>
import { computed } from "vue";
import { useTodoStore } from "../../stores/TodoStore.js";

const todoStore = useTodoStore();
const todos = computed(() => todoStore.todos);

const addTodo = () => {
  const newTodo = prompt("Enter a new todo:");
  if (newTodo) {
    todoStore.addTodo(newTodo);
  }
};

const toggleTodo = (id) => {
  todoStore.toggleTodo(id);
};

const deleteTodo = (id) => {
  todoStore.removeTodo(id);
};

const editTodo = (id) => {
  const todo = todos.value.find((todo) => todo.id === id);
  const newText = prompt("Edit todo:", todo.text);
  if (newText) {
    todoStore.editTodo(id, newText);
  }
};

const checkboxStatus = computed(() => {
  return todos.value.map((todo) => {
    return todo.completed;
  });
});
</script>

<template>
  <v-card class="todo-list">
    <v-card-title>Todo List</v-card-title>
    <v-card-text>
      <v-list class="w-full mx-auto">
        <v-list-item
          v-for="(todo, i) in todos"
          :key="todo.id"
          :class="{'bg-secondary': todo.completed}"
        >
          <template #prepend>
            <v-checkbox
              @change="toggleTodo(todo.id)"
              v-model="checkboxStatus[i]"
              hide-details
            />
          </template>
          <template #title>
            <span :class="{ completed: todo.completed }">
              {{ todo.text }}
            </span>
          </template>
          <template #append>
            <v-btn icon="mdi-pencil" color="info" class="mr-2" size="small" density="default" @click="editTodo(todo.id)"></v-btn>
            <v-btn icon="mdi-trash-can" color="error"  size="small" density="default" @click="deleteTodo(todo.id)"></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="primary" @click="addTodo">Add Todo</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}

.bg-gray-200 {
  background-color: #3a3a3a;
}

</style>
