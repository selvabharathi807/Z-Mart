import React, { useState, useEffect } from "react";

// Simple localStorage-based auth + todo app (demo-ready)

export default function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {user ? <TodoApp user={user} setUser={setUser} /> : <Auth setUser={setUser} isSignup={isSignup} setIsSignup={setIsSignup} />}
    </div>
  );
}

function Auth({ setUser, isSignup, setIsSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const fakeUser = { email };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
      <h1 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h1>
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full mb-4 p-2 border rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit} className="w-full bg-black text-white p-2 rounded">
        {isSignup ? "Create Account" : "Login"}
      </button>
      <p className="text-sm mt-4 text-center">
        {isSignup ? "Already have an account?" : "No account yet?"}{" "}
        <button className="underline" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Sign up"}
        </button>
      </p>
    </div>
  );
}

function TodoApp({ user, setUser }) {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || []);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Your Tasks</h1>
        <button onClick={logout} className="text-sm underline">Logout</button>
      </div>
      <div className="flex mb-4">
        <input
          className="flex-1 p-2 border rounded-l"
          placeholder="New task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo} className="bg-black text-white px-4 rounded-r">Add</button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={`p-2 rounded cursor-pointer ${todo.done ? "line-through text-gray-400" : "bg-gray-100"}`}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
