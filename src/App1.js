import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { mockTasks } from "./data/mockTasks";
import { Toaster } from "./components/ui/toaster";

const App1 = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load mock tasks on component mount
    setTasks(mockTasks);
  }, []);

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (taskId, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <Routes>
              <Route
                path="/"
                element={
                  <TaskList
                    tasks={tasks}
                    onAddTask={handleAddTask}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                  />
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App1;