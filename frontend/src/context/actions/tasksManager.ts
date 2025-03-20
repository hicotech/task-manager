import { Task, TaskList } from '@task-manager/shared-library';
import { TaskManagerActionsEnum } from '../constants/taskManager';
import type { TaskManagerAction } from '../types/taskManager';

/**
 * Prepares a TaskManagerAction object for dispatch to update the state with a new list of incomplete Tasks
 * Action is used when fetching tasks from the backend and updating the State Manager list of incomplete tasks with returned result
 *
 * @param tasks List of Task[] fetched from the Backend
 * @returns {TaskManagerAction} Action object to be dispatched with the new list of Task[]
 */
export const setTasks = (tasks: TaskList['tasks']): TaskManagerAction => ({
    type: TaskManagerActionsEnum.Set,
    payload: {
        tasks,
    },
});

/**
 * Prepares a TaskManagerAction object for dispatch to mark a specific Task as completed
 * Action is used when manually updating the state of Task. It moves Task from the list of incomplete tasks to list of completed tasks
 *
 * @param taskId UUID of the task to be set as completed
 * @returns {TaskManagerAction} Action object to be dispatched to move the Task to completed list
 */
export const completeTask = (taskId: Task['id']): TaskManagerAction => ({
    type: TaskManagerActionsEnum.Complete,
    payload: {
        taskId,
    },
});
