

# Task Manager

A responsive Task Manager built with React, utilizing local storage for persistence, task sorting, and priority settings. This project was developed as part of the FLARELINK internship assignment.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can view a live demo of this project [here](https://flare-link-green.vercel.app/).

## Features

- **Add Tasks**: Add tasks with titles and priority levels (High, Medium, Low).
- **Delete Tasks**: Remove tasks from the list.
- **Mark Complete/Undo**: Mark tasks as complete or undo completed status.
- **Local Storage**: Tasks are saved to local storage to persist across sessions.
- **Task Sorting**: Sort tasks by priority, title, or completion status.
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens.
- **UI Animations**: Smooth hover and button animations for an improved user experience.

## Tech Stack

- **React**: JavaScript framework for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Local Storage**: Browser storage for persisting tasks.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your machine.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Nishantvidhuri/flare-link.git
   cd flare-link
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the App**

   ```bash
   npm run dev
   ```

   The app should now be running at `http://localhost:3000` (or the port specified by Vite).

## Project Structure

```
flare-link/
├── public/             # Static files, including favicon
│   └── favicon.png
├── src/
│   ├── components/     # Reusable components
│   │   └── Task.jsx    # Task component for individual tasks
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point for React and Vite
├── .gitignore
├── package.json
└── README.md
```

## Usage

### Adding a Task

1. Click **Add Task** to open the task creation modal.
2. Enter a title for the task.
3. Select a priority (Low, Medium, or High).
4. Click **Add Task** to save.

### Marking Tasks as Complete/Incomplete

- Use the checkmark icon to mark a task as complete.
- Click the undo icon to change it back to incomplete.

### Sorting Tasks

1. Click the sort icon in the top-right corner.
2. Choose sorting criteria: Priority, Title, or Completion Status.

### Filtering Completed Tasks

- Use the checkbox to toggle visibility of completed tasks.

