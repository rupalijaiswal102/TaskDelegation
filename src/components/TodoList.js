import React from 'react';
import { Card, Alert } from 'react-bootstrap';
import { ListTodo, Search } from 'lucide-react';
import TodoItem from './TodoItems';

const TodoList = ({ todos, onToggle, onEdit, onDelete, filter }) => {
  if (todos.length === 0) {
    return (
      <Card style={{
        borderRadius: '15px',
        border: 'none',
        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
        minHeight: '300px'
      }}>
        <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-5">
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            {filter === 'completed' ? (
              <ListTodo size={40} color="#6c757d" />
            ) : (
              <Search size={40} color="#6c757d" />
            )}
          </div>
          
          <h4 style={{ color: '#6c757d', marginBottom: '1rem' }}>
            {filter === 'completed' && 'No completed tasks'}
            {filter === 'active' && 'No active tasks'}
            {filter === 'all' && 'No tasks yet'}
          </h4>
          
          <p style={{ 
            color: '#adb5bd',
            fontSize: '1.1rem',
            maxWidth: '300px',
            lineHeight: '1.6'
          }}>
            {filter === 'completed' && 'Complete some tasks to see them here.'}
            {filter === 'active' && 'All your tasks are completed! Great job!'}
            {filter === 'all' && 'Start by adding your first task to get organized.'}
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card style={{
      borderRadius: '15px',
      border: 'none',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
    }}>
      <Card.Header style={{
        background: 'linear-gradient(135deg, #6f42c1 0%, #5a2d91 100%)',
        color: 'white',
        borderRadius: '15px 15px 0 0',
        border: 'none',
        padding: '1rem 1.5rem'
      }}>
        <h5 className="mb-0 d-flex align-items-center">
          <ListTodo className="me-2" size={20} />
          {filter === 'all' && `All Tasks (${todos.length})`}
          {filter === 'active' && `Active Tasks (${todos.length})`}
          {filter === 'completed' && `Completed Tasks (${todos.length})`}
        </h5>
      </Card.Header>
      
      <Card.Body className="p-0">
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {todos.map((todo, index) => (
            <div key={todo.id}>
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
              {index < todos.length - 1 && (
                <hr style={{
                  margin: 0,
                  borderColor: '#f8f9fa',
                  opacity: 0.6
                }} />
              )}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoList;