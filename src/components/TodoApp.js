import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { CheckCircle, Circle, Plus, Filter } from 'lucide-react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilters from './TodoFilter.js';
import TodoStats from './TodoStats.js';
import { mockTodos } from '../data/mock.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);

  // Load mock data on component mount
  useEffect(() => {
    // Simulate loading from localStorage or API
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos(mockTodos);
      localStorage.setItem('todos', JSON.stringify(mockTodos));
    }
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add new todo
  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [newTodo, ...prev]);
    setShowForm(false);
    showNotification('Task added successfully!');
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
    const todo = todos.find(t => t.id === id);
    showNotification(
      `Task ${todo.completed ? 'marked as incomplete' : 'completed'}!`,
      'info'
    );
  };

  // Edit todo
  const editTodo = (id, updatedData) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, ...updatedData }
        : todo
    ));
    showNotification('Task updated successfully!');
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    showNotification('Task deleted!', 'warning');
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    switch(filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <Container fluid style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="text-center mb-4">
              <h1 style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <CheckCircle className="me-3" style={{ color: '#28a745' }} />
                Task Master
              </h1>
              <p style={{
                fontSize: '1.2rem',
                color: '#6c757d',
                fontWeight: '300'
              }}>
                Organize your tasks efficiently and boost productivity
              </p>
            </div>
          </Col>
        </Row>

        {/* Notification */}
        {notification && (
          <Row className="mb-3">
            <Col>
              <Alert 
                variant={notification.type} 
                className="text-center"
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                {notification.message}
              </Alert>
            </Col>
          </Row>
        )}

        {/* Main Content */}
        <Row>
          {/* Left Column - Stats & Filters */}
          <Col lg={4} className="mb-4">
            <TodoStats todos={todos} />
            <TodoFilters 
              currentFilter={filter}
              onFilterChange={setFilter}
              todos={todos}
            />
            
            {/* Quick Add Button */}
            <Card className="mt-3" style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
            }}>
              <Card.Body className="text-center p-4">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn btn-lg"
                  style={{
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 30px',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
                    transition: 'all 0.3s ease',
                    width: '100%'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
                  }}
                >
                  <Plus className="me-2" size={20} />
                  {showForm ? 'Cancel' : 'Add New Task'}
                </button>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Todo Form & List */}
          <Col lg={8}>
            {/* Todo Form */}
            {showForm && (
              <div className="mb-4">
                <TodoForm 
                  onSubmit={addTodo}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            {/* Todo List */}
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onEdit={editTodo}
              onDelete={deleteTodo}
              filter={filter}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TodoApp;