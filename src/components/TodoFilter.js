import React from 'react';
import { Card, ButtonGroup, Button, Badge } from 'react-bootstrap';
import { Filter, CheckCircle, Circle, List } from 'lucide-react';
import { filterOptions } from '../data/mock';

const TodoFilters = ({ currentFilter, onFilterChange, todos }) => {
  const getFilterCount = (filterType) => {
    switch(filterType) {
      case 'active':
        return todos.filter(todo => !todo.completed).length;
      case 'completed':
        return todos.filter(todo => todo.completed).length;
      case 'all':
      default:
        return todos.length;
    }
  };

  const getFilterIcon = (filterType) => {
    switch(filterType) {
      case 'active':
        return <Circle size={16} className="me-2" />;
      case 'completed':
        return <CheckCircle size={16} className="me-2" />;
      case 'all':
      default:
        return <List size={16} className="me-2" />;
    }
  };

  return (
    <Card style={{
      borderRadius: '15px',
      border: 'none',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
    }}>
      <Card.Header style={{
        background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)',
        color: 'white',
        borderRadius: '15px 15px 0 0',
        border: 'none'
      }}>
        <h6 className="mb-0 d-flex align-items-center">
          <Filter className="me-2" size={18} />
          Filter Tasks
        </h6>
      </Card.Header>
      
      <Card.Body className="p-3">
        <div className="d-grid gap-2">
          {filterOptions.map(option => {
            const count = getFilterCount(option.value);
            const isActive = currentFilter === option.value;
            
            return (
              <Button
                key={option.value}
                variant={isActive ? 'primary' : 'outline-secondary'}
                onClick={() => onFilterChange(option.value)}
                className="d-flex align-items-center justify-content-between"
                style={{
                  borderRadius: '8px',
                  padding: '12px 15px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  border: isActive ? 'none' : '2px solid #e9ecef',
                  background: isActive 
                    ? 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)'
                    : 'white',
                  color: isActive ? 'white' : '#495057',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive 
                    ? '0 4px 15px rgba(0, 123, 255, 0.3)'
                    : '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.target.style.borderColor = '#007bff';
                    e.target.style.backgroundColor = '#f8f9ff';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.backgroundColor = 'white';
                  }
                }}
              >
                <span className="d-flex align-items-center">
                  {getFilterIcon(option.value)}
                  {option.label}
                </span>
                <Badge 
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#6c757d',
                    color: isActive ? 'white' : 'white',
                    fontSize: '0.8rem',
                    padding: '4px 8px',
                    borderRadius: '12px'
                  }}
                >
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoFilters;