import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskAPI } from '../services/api';

// Hook to fetch all tasks
export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await taskAPI.getTasks();
      return response.data;
    },
  });
};

// Hook to fetch single task
export const useTask = (id) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      const response = await taskAPI.getTask(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Hook to create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (taskData) => taskAPI.createTask(taskData),
    onSuccess: (response) => {
      // Update the cache directly instead of invalidating
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        if (!oldTasks) return [response.data];
        // Add the new task to the beginning of the array (since backend sorts by createdAt desc)
        return [response.data, ...oldTasks];
      });
    },
  });
};

// Hook to update task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, taskData }) => taskAPI.updateTask(id, taskData),
    onSuccess: (response, { id }) => {
      // Update the cache directly instead of invalidating
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        if (!oldTasks) return [];
        return oldTasks.map(task => 
          task._id === id ? response.data : task
        );
      });
      
      // Also update the individual task cache if it exists
      queryClient.setQueryData(['task', id], response.data);
    },
  });
};

// Hook to delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => taskAPI.deleteTask(id),
    onSuccess: (response, id) => {
      // Update the cache directly instead of invalidating
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        if (!oldTasks) return [];
        return oldTasks.filter(task => task._id !== id);
      });
      
      // Remove the individual task from cache
      queryClient.removeQueries({ queryKey: ['task', id] });
    },
  });
};