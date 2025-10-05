import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { 
  TrendingUp, 
  CheckCircle2, 
  Circle, 
  Target,
  AlertTriangle,
  Clock,
  Award
} from 'lucide-react';

const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
  
  const highPriorityTodos = todos.filter(todo => todo.priority === 'high' && !todo.completed).length;
  const mediumPriorityTodos = todos.filter(todo => todo.priority === 'medium' && !todo.completed).length;
  const lowPriorityTodos = todos.filter(todo => todo.priority === 'low' && !todo.completed).length;

  const getProgressVariant = () => {
    if (completionRate >= 80) return 'success';
    if (completionRate >= 50) return 'info';
    if (completionRate >= 25) return 'warning';
    return 'danger';
  };

  const getMotivationalMessage = () => {
    if (completionRate === 100) return "Perfect! All tasks completed! 🎉";
    if (completionRate >= 80) return "Almost there! Great progress! 💪";
    if (completionRate >= 50) return "Good momentum! Keep it up! 🚀";
    if (completionRate >= 25) return "Nice start! You can do it! ⭐";
    return "Let's get started! Every task counts! 📝";
  };

  return (
    <Card className="mb-3" style={{
      borderRadius: '15px',
      border: 'none',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
    }}>
      <Card.Header style={{
        background: 'linear-gradient(135deg, #6f42c1 0%, #5a2d91 100%)',
        color: 'white',
        borderRadius: '15px 15px 0 0',
        border: 'none'
      }}>
        <h6 className="mb-0 d-flex align-items-center">
          <TrendingUp className="me-2" size={18} />
          Progress Overview
        </h6>
      </Card.Header>
      
      <Card.Body className="p-4">
        {/* Completion Progress */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span style={{ fontWeight: '600', color: '#495057' }}>
              Overall Progress
            </span>
            <span style={{ 
              fontWeight: '700', 
              fontSize: '1.1rem',
              color: getProgressVariant() === 'success' ? '#28a745' : '#6c757d'
            }}>
              {completionRate.toFixed(0)}%
            </span>
          </div>
          <ProgressBar 
            variant={getProgressVariant()}
            now={completionRate}
            style={{
              height: '12px',
              borderRadius: '6px',
              backgroundColor: '#e9ecef'
            }}
          />
          <small style={{ 
            color: '#6c757d', 
            fontStyle: 'italic',
            display: 'block',
            marginTop: '8px',
            textAlign: 'center'
          }}>
            {getMotivationalMessage()}
          </small>
        </div>

        {/* Quick Stats */}
        <Row className="g-3 mb-3">
          <Col xs={4}>
            <div className="text-center p-3" style={{
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <CheckCircle2 size={24} className="mb-2" />
              <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                {completedTodos}
              </div>
              <small>Done</small>
            </div>
          </Col>
          <Col xs={4}>
            <div className="text-center p-3" style={{
              background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <Circle size={24} className="mb-2" />
              <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                {activeTodos}
              </div>
              <small>Active</small>
            </div>
          </Col>
          <Col xs={4}>
            <div className="text-center p-3" style={{
              background: 'linear-gradient(135deg, #6f42c1 0%, #5a2d91 100%)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <Target size={24} className="mb-2" />
              <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                {totalTodos}
              </div>
              <small>Total</small>
            </div>
          </Col>
        </Row>

        {/* Priority Breakdown */}
        {activeTodos > 0 && (
          <div>
            <h6 style={{ 
              color: '#495057',
              marginBottom: '12px',
              fontWeight: '600'
            }}>
              Active by Priority
            </h6>
            
            <div className="d-flex gap-2">
              {highPriorityTodos > 0 && (
                <div className="flex-fill text-center p-2" style={{
                  background: 'rgba(220, 53, 69, 0.1)',
                  border: '2px solid #dc3545',
                  borderRadius: '8px',
                  fontSize: '0.85rem'
                }}>
                  <AlertTriangle size={16} style={{ color: '#dc3545' }} />
                  <div style={{ 
                    fontWeight: '700',
                    color: '#dc3545',
                    fontSize: '1rem'
                  }}>
                    {highPriorityTodos}
                  </div>
                  <small style={{ color: '#dc3545' }}>High</small>
                </div>
              )}
              
              {mediumPriorityTodos > 0 && (
                <div className="flex-fill text-center p-2" style={{
                  background: 'rgba(255, 193, 7, 0.1)',
                  border: '2px solid #ffc107',
                  borderRadius: '8px',
                  fontSize: '0.85rem'
                }}>
                  <Clock size={16} style={{ color: '#ffc107' }} />
                  <div style={{ 
                    fontWeight: '700',
                    color: '#ffc107',
                    fontSize: '1rem'
                  }}>
                    {mediumPriorityTodos}
                  </div>
                  <small style={{ color: '#ffc107' }}>Medium</small>
                </div>
              )}
              
              {lowPriorityTodos > 0 && (
                <div className="flex-fill text-center p-2" style={{
                  background: 'rgba(40, 167, 69, 0.1)',
                  border: '2px solid #28a745',
                  borderRadius: '8px',
                  fontSize: '0.85rem'
                }}>
                  <Award size={16} style={{ color: '#28a745' }} />
                  <div style={{ 
                    fontWeight: '700',
                    color: '#28a745',
                    fontSize: '1rem'
                  }}>
                    {lowPriorityTodos}
                  </div>
                  <small style={{ color: '#28a745' }}>Low</small>
                </div>
              )}
            </div>
          </div>
        )}

        {/* All Complete Message */}
        {totalTodos > 0 && completedTodos === totalTodos && (
          <div className="text-center mt-3 p-3" style={{
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            borderRadius: '10px',
            color: 'white'
          }}>
            <Award size={32} className="mb-2" />
            <h6 className="mb-1">Congratulations!</h6>
            <small>All tasks completed successfully!</small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TodoStats;