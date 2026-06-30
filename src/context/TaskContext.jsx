import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import taskService from '../services/taskService';
import toast from 'react-hot-toast';

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate'); 
  const [sortOrder, setSortOrder] = useState('asc'); 

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      const errorMsg = err.message || 'Failed to fetch tasks';
      setError(errorMsg);
      toast.error('Network error: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const newTask = {
        ...taskData,
        createdAt: new Date().toISOString()
      };
      const created = await taskService.createTask(newTask);
      setTasks((prev) => [...prev, created]);
      toast.success('Task created successfully!');
      return created;
    } catch (err) {
      const errorMsg = err.message || 'Failed to create task';
      toast.error('API Error: ' + errorMsg);
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updated = await taskService.updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success('Task updated successfully!');
      return updated;
    } catch (err) {
      const errorMsg = err.message || 'Failed to update task';
      toast.error('API Error: ' + errorMsg);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err) {
      const errorMsg = err.message || 'Failed to delete task';
      toast.error('API Error: ' + errorMsg);
      throw err;
    }
  };

 
  const priorityWeight = {
    'High': 3,
    'Medium': 2,
    'Low': 1
  };

  // Computed / filtered / sorted tasks list
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.taskName?.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
      );
    }

    // 2. Status filter
    if (statusFilter !== 'All') {
      result = result.filter((task) => task.status === statusFilter);
    }

    // 3. Sorting
    if (sortBy) {
      result.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (sortBy === 'priority') {
          valA = priorityWeight[a.priority] || 0;
          valB = priorityWeight[b.priority] || 0;
        } else if (sortBy === 'dueDate') {
          valA = new Date(a.dueDate || 0).getTime();
          valB = new Date(b.dueDate || 0).getTime();
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [tasks, searchQuery, statusFilter, sortBy, sortOrder]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
