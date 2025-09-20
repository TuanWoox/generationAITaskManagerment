import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks, useDeleteTask, useUpdateTask } from '../hooks/useTasks';
import ConfirmModal from '../components/ConfirmModal';
import TaskCard from '../components/TaskCard';

const TaskList = () => {
  const { data: tasks, isLoading, error } = useTasks();
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();
  
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null,
    taskTitle: ''
  });

  const handleDelete = (id, title) => {
    setDeleteModal({
      isOpen: true,
      taskId: id,
      taskTitle: title
    });
  };

  const confirmDelete = () => {
    if (deleteModal.taskId) {
      deleteTaskMutation.mutate(deleteModal.taskId);
      setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' });
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
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              isDeleting={deleteTaskMutation.isLoading}
            />
          ))}
        </div>
      )}
      
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteModal.taskTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteTaskMutation.isLoading}
      />
    </div>
  );
};

export default TaskList;