import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortCriteria, setSortCriteria] = useState({ field: '', order: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (title.trim()) {
      setTasks([...tasks, { id: Date.now(), title, priority, completed: false }]);
      setTitle('');
      setPriority('Low');
      setIsModalOpen(false);
    }
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSort = (field, order) => {
    setSortCriteria({ field, order });
    setIsSortPopupOpen(false);
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => priorityFilter === 'All' || task.priority === priorityFilter)
    .filter((task) => (hideCompleted ? !task.completed : true))
    .sort((a, b) => {
      if (sortCriteria.field === 'Title') {
        return sortCriteria.order === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortCriteria.field === 'Priority') {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortCriteria.order === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortCriteria.field === 'Completed') {
        return sortCriteria.order === 'asc'
          ? a.completed - b.completed
          : b.completed - a.completed;
      }
      return 0;
    });

  return (
    <div className="flex justify-center items-start p-4 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-lg relative p-6 z-0 overflow-visible">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-100">Task Manager</h1>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded-lg mb-4 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={() => setHideCompleted(!hideCompleted)}
            className="mr-2 h-5 w-5 text-blue-500 rounded focus:ring-0"
          />
          <label className="text-gray-400 text-sm">
            {hideCompleted ? 'Hide Completed Tasks' : 'Show All Tasks'}
          </label>
        </div>

        {/* Scrollable Task List with "No Tasks Assigned" Message */}
        <div className="task-list max-h-72 sm:max-h-80 lg:max-h-96 overflow-y-auto mb-4 overflow-x-visible">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 mt-4">
              No tasks assigned
            </div>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-8 py-3 sm:px-12 sm:py-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          Add Task
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 sm:w-full max-w-md text-gray-200">
              <h2 className="text-xl font-bold mb-4">Add New Task</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full p-2 border border-gray-600 rounded-lg mb-2 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
              />
              <label className="block text-sm text-gray-400 mb-1">Select Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-lg mb-4 bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button
                onClick={addTask}
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Task
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sort Button and Popup */}
      <div className="relative ml-4">
        <button
          onClick={() => setIsSortPopupOpen((prev) => !prev)}
          className="text-gray-400 hover:text-gray-100"
        >
          <i className="fa-solid fa-arrow-up-wide-short"></i>
        </button>

        {isSortPopupOpen && (
          <div
            className="absolute top-0 right-0 sm:left-full bg-gray-800 shadow-md rounded p-3 w-40 sm:w-48 z-50 mt-2 sm:ml-4 text-gray-200"
            style={{ transform: 'translateX(-50%)', maxWidth: '90vw' }}
          >
            <p className="text-sm font-bold mb-2">Sort By:</p>
            <button
              onClick={() => handleSort('Priority', 'asc')}
              className="w-full text-left px-2 py-1 hover:bg-gray-700"
            >
              Priority (High to Low)
            </button>
            <button
              onClick={() => handleSort('Priority', 'desc')}
              className="w-full text-left px-2 py-1 hover:bg-gray-700"
            >
              Priority (Low to High)
            </button>
            <button
              onClick={() => handleSort('Title', 'asc')}
              className="w-full text-left px-2 py-1 hover:bg-gray-700"
            >
              Title (A-Z)
            </button>
            <button
              onClick={() => handleSort('Title', 'desc')}
              className="w-full text-left px-2 py-1 hover:bg-gray-700"
            >
              Title (Z-A)
            </button>
            <button
              onClick={() => handleSort('Completed', 'asc')}
              className="w-full text-left px-2 py-1 hover:bg-gray-700"
            >
              Completion (Incomplete First)
            </button>
            <button
              onClick={() => handleSort('Completed', 'desc')}
              className="w-full text-left px-2 py-1 hover:bg-gray-700"
            >
              Completion (Complete First)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
