// Mock data for todo list application
export const mockTodos = [
  {
    id: "1",
    text: "Complete React todo application",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z",
    priority: "high"
  },
  {
    id: "2", 
    text: "Review Bootstrap documentation",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z",
    priority: "medium"
  },
  {
    id: "3",
    text: "Plan next sprint features",
    completed: false,
    createdAt: "2024-01-13T09:15:00Z", 
    priority: "high"
  },
  {
    id: "4",
    text: "Update project dependencies",
    completed: false,
    createdAt: "2024-01-12T14:45:00Z",
    priority: "low"
  },
  {
    id: "5",
    text: "Write user documentation",
    completed: true,
    createdAt: "2024-01-11T11:20:00Z",
    priority: "medium"
  }
];

// Priority levels
export const priorities = [
  { value: "low", label: "Low", color: "#28a745" },
  { value: "medium", label: "Medium", color: "#ffc107" },
  { value: "high", label: "High", color: "#dc3545" }
];

// Filter options
export const filterOptions = [
  { value: "all", label: "All Tasks" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" }
];