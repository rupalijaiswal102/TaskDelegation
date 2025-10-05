import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Pencil, Trash2, Plus, Filter, CheckCircle, Clock, AlertCircle, UserCheck, UserPlus, Sparkles, TrendingUp } from 'lucide-react';

const TaskList = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { toast } = useToast();

  const [newTask, setNewTask] = useState({
    name: '',
    do: '',
    doer: '',
    assignedBy: 'Admin User',
    status: 'pending'
  });

  const statusColors = {
    pending: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200',
    'in-progress': 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200',
    completed: 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200'
  };

  const statusIcons = {
    pending: <Clock className="w-3 h-3" />,
    'in-progress': <AlertCircle className="w-3 h-3" />,
    completed: <CheckCircle className="w-3 h-3" />
  };

  // Get unique assignees for filter
  const uniqueAssignees = [...new Set(tasks.map(task => task.doer))];

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesAssignee = filterAssignee === 'all' || task.doer === filterAssignee;
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.do.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.doer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesAssignee && matchesSearch;
  });

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  const handleAddTask = () => {
    if (!newTask.name || !newTask.do || !newTask.doer) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onAddTask({
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    });

    setNewTask({ name: '', do: '', doer: '', assignedBy: 'Admin User', status: 'pending' });
    setIsAddDialogOpen(false);
    toast({
      title: "Task Delegated! ✨",
      description: `Task successfully assigned to ${newTask.doer}`
    });
  };

  const handleUpdateTask = (taskId, updates) => {
    onUpdateTask(taskId, updates);
    setEditingTask(null);
    toast({
      title: "Task Updated",
      description: "Task has been successfully updated."
    });
  };

  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
    toast({
      title: "Task Removed",
      description: "Task has been successfully deleted."
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section with Stats */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-8 w-8 text-yellow-300" />
              <h1 className="text-4xl font-bold">Task Delegation Hub</h1>
            </div>
            <p className="text-emerald-100 text-lg mb-4">Efficiently manage and track team assignments</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm">Total Tasks</p>
                    <p className="text-2xl font-bold">{totalTasks}</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-emerald-200" />
                </div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-green-300">{completedTasks}</p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-300" />
                </div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm">In Progress</p>
                    <p className="text-2xl font-bold text-blue-300">{inProgressTasks}</p>
                  </div>
                  <AlertCircle className="h-6 w-6 text-blue-300" />
                </div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-yellow-300">{pendingTasks}</p>
                  </div>
                  <Clock className="h-6 w-6 text-yellow-300" />
                </div>
              </div>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Delegate New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <UserPlus className="h-5 w-5 text-emerald-600" />
                  Delegate New Task
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="taskName">Task Name *</Label>
                  <Input
                    id="taskName"
                    placeholder="Enter task name"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taskDescription">Task Description *</Label>
                  <Textarea
                    id="taskDescription"
                    placeholder="Describe what needs to be done"
                    value={newTask.do}
                    onChange={(e) => setNewTask({ ...newTask, do: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assign To *</Label>
                  <Input
                    id="assignee"
                    placeholder="Enter employee name"
                    value={newTask.doer}
                    onChange={(e) => setNewTask({ ...newTask, doer: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedBy">Assigned By</Label>
                  <Input
                    id="assignedBy"
                    value={newTask.assignedBy}
                    onChange={(e) => setNewTask({ ...newTask, assignedBy: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Initial Status</Label>
                  <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTask} className="bg-emerald-600 hover:bg-emerald-700">
                    Delegate Task
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-white to-gray-50">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="🔍 Search tasks, descriptions, or assignees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 text-lg border-2 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 h-12 border-2 border-gray-200">
                  <Filter className="w-4 h-4 mr-2 text-emerald-600" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterAssignee} onValueChange={setFilterAssignee}>
                <SelectTrigger className="w-40 h-12 border-2 border-gray-200">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  {uniqueAssignees.map(assignee => (
                    <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            statusColors={statusColors}
            statusIcons={statusIcons}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="py-16 text-center">
            <div className="text-gray-400 text-xl mb-2">
              📋 No tasks found matching your criteria
            </div>
            <p className="text-gray-500 mb-4">Try adjusting your filters or delegate a new task</p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Delegate Your First Task
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const TaskCard = ({ task, onUpdate, onDelete, statusColors, statusIcons, editingTask, setEditingTask }) => {
  const [editForm, setEditForm] = useState({
    name: task.name,
    do: task.do,
    doer: task.doer,
    assignedBy: task.assignedBy,
    status: task.status
  });

  const handleSaveEdit = () => {
    onUpdate(task.id, editForm);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditForm({
      name: task.name,
      do: task.do,
      doer: task.doer,
      assignedBy: task.assignedBy,
      status: task.status
    });
  };

  if (editingTask === task.id) {
    return (
      <Card className="border-2 border-emerald-300 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardHeader className="pb-3">
          <div className="space-y-3">
            <Input
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              placeholder="Task name"
            />
            <Textarea
              value={editForm.do}
              onChange={(e) => setEditForm({ ...editForm, do: e.target.value })}
              placeholder="Task description"
              rows={2}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={editForm.doer}
                onChange={(e) => setEditForm({ ...editForm, doer: e.target.value })}
                placeholder="Assigned to"
              />
              <Input
                value={editForm.assignedBy}
                onChange={(e) => setEditForm({ ...editForm, assignedBy: e.target.value })}
                placeholder="Assigned by"
              />
            </div>
            <Select value={editForm.status} onValueChange={(value) => setEditForm({ ...editForm, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white via-gray-50 to-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
            {task.name}
          </CardTitle>
          <div className="flex space-x-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingTask(task.id)}
              className="h-8 w-8 p-0 hover:bg-emerald-100 rounded-full"
            >
              <Pencil className="w-4 h-4 text-emerald-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 hover:bg-red-100 rounded-full"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 font-medium mb-2">📝 Description:</p>
          <p className="text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-lg">{task.do}</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <UserCheck className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs text-blue-600 font-medium">Assigned To</p>
              <p className="font-semibold text-blue-900">{task.doer}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-lg">
            <UserPlus className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-xs text-purple-600 font-medium">Delegated By</p>
              <p className="font-semibold text-purple-900">{task.assignedBy || 'Admin User'}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <Badge className={`${statusColors[task.status]} flex items-center gap-1 px-3 py-1 font-medium`}>
            {statusIcons[task.status]}
            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
          </Badge>
          
          {task.createdAt && (
            <p className="text-xs text-gray-500 font-medium">
              📅 {new Date(task.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;