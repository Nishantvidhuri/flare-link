import React from 'react';

const Task = ({ task, onDelete, onToggleComplete }) => {
  // Styles for priority labels based on task urgency
  const priorityLabelStyles = {
    High: 'bg-red-800 text-red-200 px-3 py-1 rounded-md text-sm font-semibold',
    Medium: 'bg-yellow-800 text-yellow-200 px-3 py-1 rounded-md text-sm font-semibold',
    Low: 'bg-green-800 text-green-200 px-3 py-1 rounded-md text-sm font-semibold',
  };

  return (
    <div
      className={`p-4 border w-[95%] mx-auto border-gray-600 rounded-lg shadow-md mb-3 transition-all transform hover:scale-105 ${
        task.completed ? 'bg-gray-800 line-through text-gray-500' : 'bg-gray-900 text-gray-100'
      }`}
    >
      <div className="flex justify-between items-center">
        
        {/* Task title and priority */}
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          {/* Priority label with background for all screens */}
          <span className={`text-xs mt-1 ${priorityLabelStyles[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        
        {/* Action buttons with larger size */}
        <div className="space-x-4 flex items-center text-lg">
          {/* Toggle between check and undo icons based on completion status */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className="text-green-400 md:hidden"
          >
            <i className={`fas ${task.completed ? 'fa-undo' : 'fa-check'}`}></i>
          </button>
          <button
            onClick={() => onToggleComplete(task.id)}
            className="px-4 py-2 bg-blue-700 text-gray-200 rounded-lg hover:bg-blue-600 transition-colors hidden md:block"
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>

          {/* Cross icon for delete */}
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-400 text-xl md:hidden"
          >
            <i className="fas fa-times"></i>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-red-600 transition-colors hidden md:block"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
