'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

const task = {id: 1, text: "Todo Test", completed: false}
const LOCAL_STORAGE_KEY = "task-list";

export default function Home() {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {
      tasks: [],
      filter: 'all',
      new: '',
      taskID: 1
    };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  
  const handleAddTask = () => {
    if (state.new) {
      const newTask = {
        text: state.new,
        completed: false,
        id: state.taskID
      };

      setState(prevState => ({
        ...prevState,
        tasks: [...prevState.tasks, newTask],
        new: '', 
        taskID: prevState.taskID + 1       //increment id
      }));
    }
  };

  const handleToggleTask = (id) => {
    const toggleTasks = state.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setState({ ...state, tasks: toggleTasks });
  };

  const handleDeleteTask = (id) => {
    const activeTasks = state.tasks.filter(task => task.id !== id);
    setState({ ...state, tasks: activeTasks });
  };

  const itemsLeft = state.tasks.filter(task => !task.completed).length;

  const handleCompletedTask = () => {
    const activeTasks = state.tasks.filter(task => !task.completed);
    setState({ ...state, tasks: activeTasks });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={state.new}
          onChange={(e) => setState({ ...state, new: e.target.value })}
        />
        <button
          onClick = {handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <TaskList
          tasks={state.tasks}
          filter={state.filter}
          toggleTask ={handleToggleTask}
          deleteTask = {handleDeleteTask}
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{itemsLeft} items left</span>
          <div>
            <button onClick={() => setState({ ...state, filter: 'all' })} className={`mr-2 ${state.filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setState({ ...state, filter: 'active' })} className={`mr-2 ${state.filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setState({ ...state, filter: 'completed' })} className={`${state.filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={handleCompletedTask}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
