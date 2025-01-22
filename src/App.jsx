import { useState, useEffect } from 'react'
import minecraftLogo from '/assets/minecraft-logo.png'
import Pomodoro from './Pomodoro'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [input, setInput] = useState('')
  const [activeTab, setActiveTab] = useState('todo')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false
    }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="container">
      <div className="header">
        <img src={minecraftLogo} alt="Minecraft Logo" />
        <h1>Minecraft Productivity</h1>
      </div>

      <div className="tab-buttons">
        <button 
          className={`minecraft-btn ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          Todo List
        </button>
        <button 
          className={`minecraft-btn ${activeTab === 'pomodoro' ? 'active' : ''}`}
          onClick={() => setActiveTab('pomodoro')}
        >
          Pomodoro Timer
        </button>
      </div>

      {activeTab === 'todo' ? (
        <>
          <form className="todo-input" onSubmit={addTodo}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add new task..."
            />
            <button type="submit">Add</button>
          </form>

          <div className="todo-list">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                <span onClick={() => toggleTodo(todo.id)}>
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Pomodoro />
      )}
    </div>
  )
}

export default App
