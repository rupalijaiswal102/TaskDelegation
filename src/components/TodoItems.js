import React, { useState } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import { 
  CheckCircle, 
  Circle, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Clock,
  AlertCircle 
} from 'lucide-react';
import { priorities } from '../data/mock';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editText.trim().length >= 3) {
      onEdit(todo.id, {
        text: editText.trim(),
        priority: editPriority
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityConfig = (priority) => {
    return priorities.find(p => p.value === priority);
  };

  const priorityConfig = getPriorityConfig(todo.priority);

  return (
    <div style={{
      padding: '1.5rem',
      transition: 'all 0.2s ease',
      background: todo.completed ? '#f8f9fa' : 'white'
    }}>
      <div className="d-flex align-items-start gap-3">
        {/* Completion Toggle */}
        <button
          onClick={() => onToggle(todo.id)}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            marginTop: '2px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {todo.completed ? (
            <CheckCircle 
              size={24} 
              style={{ 
                color: '#28a745',
                filter: 'drop-shadow(0 2px 4px rgba(40, 167, 69, 0.3))'
              }} 
            />
          ) : (
            <Circle 
              size={24} 
              style={{ 
                color: '#6c757d',
                strokeWidth: 2
              }} 
            />
          )}
        </button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {isEditing ? (
            // Edit Mode
            <div>
              <div className="d-flex gap-2 mb-2">
                <Form.Control
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #007bff',
                    fontSize: '1rem'
                  }}
                  autoFocus
                />
                <Form.Select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  style={{
                    width: '120px',
                    borderRadius: '8px',
                    border: '2px solid #007bff'
                  }}
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </Form.Select>
              </div>
              
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={handleSave}
                  disabled={editText.trim().length < 3}
                  style={{
                    borderRadius: '6px',
                    fontSize: '0.875rem'
                  }}
                >
                  <Save size={14} className="me-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={handleCancel}
                  style={{
                    borderRadius: '6px',
                    fontSize: '0.875rem'
                  }}
                >
                  <X size={14} className="me-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            // View Mode
            <div>
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                <h6 style={{
                  margin: 0,
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: todo.completed ? '#6c757d' : '#212529',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  opacity: todo.completed ? 0.7 : 1,
                  wordBreak: 'break-word',
                  flex: 1
                }}>
                  {todo.text}
                </h6>
                
                <Badge
                  style={{
                    backgroundColor: priorityConfig.color,
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontWeight: '500'
                  }}
                >
                  {todo.priority === 'high' && <AlertCircle size={12} className="me-1" />}
                  {priorityConfig.label}
                </Badge>
              </div>
              
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center text-muted">
                  <Clock size={14} className="me-1" />
                  <small style={{ fontSize: '0.85rem' }}>
                    Created {formatDate(todo.createdAt)}
                  </small>
                </div>
                
                <div className="d-flex gap-2">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => setIsEditing(true)}
                    style={{
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '0.75rem'
                    }}
                  >
                    <Edit2 size={12} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onDelete(todo.id)}
                    style={{
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '0.75rem'
                    }}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;