import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ListTodo, CheckCircle2, Clock, AlertCircle, Plus, FileText, SearchCode } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import StatsCard from '../../components/StatsCard';
import TaskTable from '../../components/TaskTable';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import TaskForm from '../../components/TaskForm';

export const DashboardPage = () => {
  const {
    tasks,
    filteredTasks,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    addTask,
    updateTask,
    deleteTask
  } = useTasks();

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Dynamic statistics calculations
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const pending = tasks.filter((t) => t.status === 'Pending').length;
    const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
    return { total, completed, pending, inProgress };
  }, [tasks]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    setDeleting(true);
    try {
      await deleteTask(taskToDelete.id);
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      // Error is caught and toast alert is triggered in Context
    } finally {
      setDeleting(false);
    }
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  };

  const handleCreateSubmit = async (data) => {
    try {
      await addTask(data);
      setCreateModalOpen(false);
    } catch (err) {
      // Handled in Context
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      await updateTask(taskToEdit.id, data);
      setEditModalOpen(false);
      setTaskToEdit(null);
    } catch (err) {
      // Handled in Context
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  // Filter tabs setup
  const filters = [
    { label: 'All', value: 'All', count: stats.total },
    { label: 'Pending', value: 'Pending', count: stats.pending },
    { label: 'In Progress', value: 'In Progress', count: stats.inProgress },
    { label: 'Completed', value: 'Completed', count: stats.completed }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Upper Dashboard Header Section */}
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="text-left min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-sm sm:max-w-xl">
            Monitor and coordinate all your active team workflows.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setCreateModalOpen(true)}
          className="shadow-lg shadow-blue-500/20 py-2 sm:py-2.5 px-3 sm:px-5 shrink-0 flex items-center justify-center"
          title="Create Task"
        >
          <Plus className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Create Task</span>
        </Button>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={ListTodo}
          colorClass="bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-500/30"
          delay={0.05}
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          colorClass="bg-gradient-to-tr from-blue-500 to-cyan-500 shadow-blue-500/30"
          delay={0.1}
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={AlertCircle}
          colorClass="bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/30"
          delay={0.15}
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          colorClass="bg-gradient-to-tr from-emerald-500 to-green-600 shadow-emerald-500/30"
          delay={0.2}
        />
      </div>

      {/* Main tasks container */}
      {loading && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl shadow-md min-h-[300px]">
          <LoadingSpinner size="lg" />
          <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-4">
            Loading your tasks workspace...
          </span>
        </div>
      ) : tasks.length === 0 ? (
        /* Empty State (No tasks in database) */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-10 md:p-16 shadow-md flex flex-col items-center justify-center text-center max-w-lg mx-auto"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 border border-blue-100/50 dark:border-blue-900/50">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            No tasks found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
            It looks like you don't have any tasks set up yet. Get started by creating your first task!
          </p>
          <Button
            variant="primary"
            onClick={() => setCreateModalOpen(true)}
            className="py-2.5 px-6 shadow-md shadow-blue-500/10"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Add First Task
          </Button>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-805 pb-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 max-w-full">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap relative flex items-center gap-1 sm:gap-2 ${
                    statusFilter === f.value
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-100/50 dark:border-blue-900/50'
                      : 'text-slate-500 dark:text-slate-450 hover:text-slate-850 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold ${
                    statusFilter === f.value
                      ? 'bg-blue-150 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-450'
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </div>
          </div>

          {/* Task Table or No Results Search State */}
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-12 shadow-md flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
                <SearchCode className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                No matching results
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 max-w-xs">
                Your search query "{searchQuery}" or status filters didn't return any tasks.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <TaskTable
              tasks={filteredTasks}
              loading={loading}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => !deleting && setDeleteModalOpen(false)}
        title="Confirm Task Deletion"
        size="sm"
      >
        <div className="flex flex-col gap-5 text-left">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-650 shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Are you sure you want to delete this task?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-455 mt-1 leading-relaxed">
                This action is permanent and cannot be undone. Task: <strong className="text-slate-700 dark:text-slate-300 font-bold">"{taskToDelete?.taskName}"</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleting}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              isLoading={deleting}
              size="sm"
            >
              Delete Task
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Task Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Task"
        size="lg"
      >
        <TaskForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setCreateModalOpen(false)}
          submitLabel="Create Task"
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setTaskToEdit(null);
        }}
        title="Edit Task"
        size="lg"
      >
        {taskToEdit && (
          <TaskForm
            defaultValues={{
              taskName: taskToEdit.taskName,
              description: taskToEdit.description,
              priority: taskToEdit.priority,
              status: taskToEdit.status,
              dueDate: taskToEdit.dueDate
            }}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditModalOpen(false);
              setTaskToEdit(null);
            }}
            submitLabel="Save Changes"
          />
        )}
      </Modal>
    </div>
  );
};

export default DashboardPage;
