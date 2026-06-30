import React from 'react';
import { Edit2, Trash2, ArrowUpDown, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { TASK_STATUS } from '../constants/taskStatus';
import { TASK_PRIORITY } from '../constants/taskPriority';
import LoadingSpinner from './LoadingSpinner';

export const TaskTable = ({
  tasks,
  loading,
  sortBy,
  sortOrder,
  onSort,
  onEditClick,
  onDeleteClick
}) => {

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case TASK_PRIORITY.HIGH:
        return 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-450 border border-red-200/50 dark:border-red-900/50';
      case TASK_PRIORITY.MEDIUM:
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-450 border border-amber-200/50 dark:border-amber-900/50';
      case TASK_PRIORITY.LOW:
      default:
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-450 border border-blue-200/50 dark:border-blue-900/50';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case TASK_STATUS.COMPLETED:
        return 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-450 border border-green-200/50 dark:border-green-900/50';
      case TASK_STATUS.IN_PROGRESS:
        return 'bg-blue-50 text-blue-750 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50';
      case TASK_STATUS.PENDING:
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350 border border-slate-200/50 dark:border-slate-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';

    const parts = dateString.split('-');
    if (parts.length === 3) {
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderSortIcon = (field) => {
    if (sortBy !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-500" />;
    return sortOrder === 'asc'
      ? <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-450 font-bold" />
      : <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-450 font-bold" />;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-md min-h-[300px]">
        <LoadingSpinner size="lg" />
        <span className="text-sm font-semibold text-slate-400 dark:text-slate-550 mt-4">
          Loading tasks from database...
        </span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Card List View (Visible on mobile, hidden on larger screens) */}
      <div className="block sm:hidden flex flex-col gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-3"
          >
            {/* Header: Title & Actions */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1 text-left min-w-0 flex-1">
                <span className="text-sm font-semibold text-slate-800 dark:text-white break-words">
                  {task.taskName}
                </span>
                {task.description && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 line-clamp-3 break-words">
                    {task.description}
                  </span>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onEditClick(task)}
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all focus:outline-none"
                  title="Edit Task"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteClick(task)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all focus:outline-none"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Badges and Info Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100/50 dark:border-slate-800/50">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded-md tracking-wider uppercase ${getPriorityBadge(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded-md tracking-wider uppercase ${getStatusBadge(task.status)}`}>
                  {task.status}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (Hidden on mobile, visible on larger screens) */}
      <div className="hidden sm:block bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
                <th className="px-6 py-4">Task Name</th>
                <th
                  onClick={() => onSort('priority')}
                  className="px-6 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    Priority {renderSortIcon('priority')}
                  </div>
                </th>
                <th className="px-6 py-4">Status</th>
                <th
                  onClick={() => onSort('dueDate')}
                  className="px-6 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    Due Date {renderSortIcon('dueDate')}
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all duration-200 group"
                >
                  {/* Task Name & description */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5 max-w-sm sm:max-w-md lg:max-w-lg">
                      <span className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {task.taskName}
                      </span>
                      <span className="text-xs text-slate-450 dark:text-slate-550 truncate">
                        {task.description}
                      </span>
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg tracking-wider uppercase ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg tracking-wider uppercase ${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => onEditClick(task)}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all focus:outline-none"
                        title="Edit Task"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteClick(task)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all focus:outline-none"
                        title="Delete Task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
