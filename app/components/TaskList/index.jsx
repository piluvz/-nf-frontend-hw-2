import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({ tasks, filter, toggleTask, deleteTask }) => {
  // Render TaskItems using TaskItem component
  // Filter tasks by status here
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'active') {
      return !task.completed;
    }
    return true;
  });

  return (
    <>
    <ul>
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
    </>
  );
};

export default TaskList;
