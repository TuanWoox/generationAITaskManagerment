import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateTask, useUpdateTask, useTask } from '../hooks/useTasks';

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    completed: false
  });

  const { data: task, isLoading: taskLoading } = useTask(id);
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

  useEffect(() => {
    if (isEditing && task) {
      setFormData({
        title: task.title,
        completed: task.completed
      });
    }
  }, [isEditing, task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      if (isEditing) {
        await updateTaskMutation.mutateAsync({
          id,
          taskData: formData
        });
      } else {
        await createTaskMutation.mutateAsync(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Error saving task. Please try again.');
    }
  };

  if (isEditing && taskLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title..."
              required
            />
          </div>

          {isEditing && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="completed" className="ml-2 block text-sm text-gray-700">
                Mark as completed
              </label>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={createTaskMutation.isLoading || updateTaskMutation.isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createTaskMutation.isLoading || updateTaskMutation.isLoading
                ? 'Saving...'
                : isEditing
                ? 'Update Task'
                : 'Create Task'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;