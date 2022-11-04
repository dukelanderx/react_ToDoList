import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setToDos] = useState([])
    const todoNameRef = useRef()

     useEffect(() => {
        const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedToDos) setToDos(storedToDos)
     }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleToDo(id) {
        const newToDos = [...todos]
        const todo = newToDos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setToDos(newToDos)
    }

    function handleAddToDo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setToDos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: name, complete:false }]
        })
        todoNameRef.current.value = null
    }

    function handleClearToDo() {
        const newToDos = todos.filter(todo => !todo.complete)
        setToDos(newToDos)
    }
    return (
    <>
        <ToDoList todos={todos} toggleToDo={toggleToDo} />
        <input ref={todoNameRef} type="text" />
        <button onClick={handleAddToDo}>Add ToDo</button>
        <button onClick={handleClearToDo}>Clear Completed ToDo</button>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
