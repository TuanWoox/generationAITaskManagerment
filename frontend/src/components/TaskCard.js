import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onDelete, 
  isDeleting = false 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task)}
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
            onClick={() => onDelete(task._id, task.title)}
            className="text-red-600 hover:text-red-800 font-medium"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-500">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskCard;