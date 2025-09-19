import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks, useDeleteTask, useUpdateTask } from '../hooks/useTasks';

const TaskList = () => {
  const { data: tasks, isLoading, error } = useTasks();
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(id);
    }
  };

  const handleToggleComplete = (task) => {
    updateTaskMutation.mutate({
      id: task._id,
      taskData: { ...task, completed: !task.completed }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading tasks: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
        <Link
          to="/add-task"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Add New Task
        </Link>
      </div>

      {tasks && tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No tasks yet!</p>
          <Link
            to="/add-task"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks?.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <h3
                    className={`text-lg font-medium ${
                      task.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                  
                  <Link
                    to={`/edit-task/${task._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                    disabled={deleteTaskMutation.isLoading}
                  >
                    {deleteTaskMutation.isLoading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;