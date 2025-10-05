import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Plus, X } from 'lucide-react';
import { priorities } from '../data/mock';

const TodoForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    text: initialData?.text || '',
    priority: initialData?.priority || 'medium'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.text.trim()) {
      newErrors.text = 'Task description is required';
    } else if (formData.text.trim().length < 3) {
      newErrors.text = 'Task must be at least 3 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        text: formData.text.trim(),
        priority: formData.priority
      });
      
      // Reset form if not editing
      if (!initialData) {
        setFormData({ text: '', priority: 'medium' });
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  return (
    <Card style={{
      borderRadius: '15px',
      border: 'none',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
    }}>
      <Card.Header style={{
        background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
        color: 'white',
        borderRadius: '15px 15px 0 0',
        border: 'none'
      }}>
        <h5 className="mb-0 d-flex align-items-center">
          <Plus className="me-2" size={20} />
          {initialData ? 'Edit Task' : 'Add New Task'}
        </h5>
      </Card.Header>
      
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label style={{
                  fontWeight: '600',
                  color: '#495057',
                  marginBottom: '8px'
                }}>
                  Task Description *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your task description..."
                  value={formData.text}
                  onChange={(e) => handleInputChange('text', e.target.value)}
                  isInvalid={!!errors.text}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e9ecef',
                    fontSize: '1rem',
                    padding: '12px 15px',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007bff';
                    e.target.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.text && (
                  <Form.Control.Feedback type="invalid">
                    {errors.text}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label style={{
                  fontWeight: '600',
                  color: '#495057',
                  marginBottom: '8px'
                }}>
                  Priority Level
                </Form.Label>
                <Form.Select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e9ecef',
                    fontSize: '1rem',
                    padding: '12px 15px'
                  }}
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-3 justify-content-end">
            <Button
              type="button"
              variant="outline-secondary"
              onClick={onCancel}
              style={{
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: '500',
                borderWidth: '2px'
              }}
            >
              <X className="me-2" size={16} />
              Cancel
            </Button>
            
            <Button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 25px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
              }}
            >
              <Plus className="me-2" size={16} />
              {initialData ? 'Update Task' : 'Add Task'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TodoForm;