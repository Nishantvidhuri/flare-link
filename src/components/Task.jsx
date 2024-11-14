import React from 'react';

// Displays individual task with title, priority, and action buttons
const Task = ({ task, onDelete, onToggleComplete }) => {
  
  // Styles for priority labels based on task urgency
  const priorityLabelStyles = {
    High: 'bg-red-800 text-red-200 px-2 py-1 rounded-md',
    Medium: 'bg-yellow-800 text-yellow-200 px-2 py-1 rounded-md',
    Low: 'bg-green-800 text-green-200 px-2 py-1 rounded-md',
  };

  return (
    <div
      className={`p-4 border w-[95%] mx-auto border-gray-600 rounded-lg shadow-md mb-3 transition-all transform translate-y-2 hover:scale-105 ${
        task.completed ? 'bg-gray-800 line-through text-gray-500' : 'bg-gray-900 text-gray-100'
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Task title and priority */}
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-xs text-gray-400 mt-1 flex items-center">
            Priority:
            <span className={`ml-2 ${priorityLabelStyles[task.priority]}`}>
              {task.priority}
            </span>
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="space-x-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="px-3 py-1 bg-blue-700 text-gray-200 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
