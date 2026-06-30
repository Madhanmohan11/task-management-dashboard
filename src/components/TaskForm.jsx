import React from 'react';
import { useForm } from 'react-hook-form';
import { TASK_STATUS_LIST } from '../constants/taskStatus';
import { TASK_PRIORITY_LIST } from '../constants/taskPriority';
import Input from './Input';
import Button from './Button';

export const TaskForm = ({
  defaultValues,
  onSubmit,
  submitLabel = 'Submit',
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: defaultValues || {
      taskName: '',
      description: '',
      priority: 'Low',
      status: 'Pending',
      dueDate: ''
    }
  });

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-5 text-left">
      {/* Task Name */}
      <Input
        id="taskName"
        type="text"
        label="Task Name"
        placeholder="Enter task name..."
        error={errors.taskName}
        disabled={isSubmitting}
        {...register('taskName', {
          required: 'Task name is required',
          minLength: {
            value: 3,
            message: 'Task name must be at least 3 characters'
          },
          maxLength: {
            value: 100,
            message: 'Task name cannot exceed 100 characters'
          }
        })}
      />

      {/* Description */}
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor="description"
          className="text-xs font-semibold text-slate-650 dark:text-slate-400 uppercase tracking-wider text-left"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter task description details..."
          disabled={isSubmitting}
          className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-h-[100px] ${
            errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
          }`}
          {...register('description', {
            required: 'Description is required'
          })}
        />
        {errors.description && (
          <span className="text-xs font-medium text-red-500 mt-0.5 text-left">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Priority */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="priority"
            className="text-xs font-semibold text-slate-650 dark:text-slate-400 uppercase tracking-wider text-left"
          >
            Priority
          </label>
          <select
            id="priority"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            {...register('priority', { required: 'Priority is required' })}
          >
            {TASK_PRIORITY_LIST.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          {errors.priority && (
            <span className="text-xs font-medium text-red-500 mt-0.5 text-left">
              {errors.priority.message}
            </span>
          )}
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="status"
            className="text-xs font-semibold text-slate-655 dark:text-slate-400 uppercase tracking-wider text-left"
          >
            Status
          </label>
          <select
            id="status"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            {...register('status', { required: 'Status is required' })}
          >
            {TASK_STATUS_LIST.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <span className="text-xs font-medium text-red-500 mt-0.5 text-left">
              {errors.status.message}
            </span>
          )}
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1.5 w-full">
          <Input
            id="dueDate"
            type="date"
            label="Due Date"
            error={errors.dueDate}
            disabled={isSubmitting}
            {...register('dueDate', {
              required: 'Due date is required',
              validate: (value) => {
                const todayStr = getTodayString();
                if (value < todayStr) {
                  return 'Due date cannot be in the past';
                }
                return true;
              }
            })}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          isLoading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
