import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { mockTasks } from "./data/mockTasks";
import { Toaster } from "./components/ui/toaster";
import 'bootstrap/dist/css/bootstrap.min.css';

const App1 = () => {
const [tasks, setTasks] = useState([]);

useEffect(() => {
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

return ( <div className="App"> <Router> <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50"> <Navbar /> <div className="container mx-auto px-4 py-8 max-w-7xl"> <Routes>
<Route
path="/"
element={ <TaskList
                 tasks={tasks}
                 onAddTask={handleAddTask}
                 onUpdateTask={handleUpdateTask}
                 onDeleteTask={handleDeleteTask}
               />
}
/> </Routes> </div> <Footer /> </div> <Toaster /> </Router> </div>
);
};

export default App1;
