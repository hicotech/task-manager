import { TaskManagerActionsEnum } from '../constants/taskManager';
import type { TaskManagerAction, TaskManagerState } from '../types/taskManager';

/**
 * Reducer function to handle task management actions and update the state
 *
 * TaskManagerAction.Set - Sets new list of incomplete Tasks
 * TaskManagerAction.Complete - Moves selected Task from list of incomplete tasks to list of completed tasks
 *
 * @param state Current state of Task Manager
 * @param action Action to be performed on current state
 *
 * @returns Updated state after applying the action
 */
export const tasksManagerReducer = (state: TaskManagerState, action: TaskManagerAction) => {
    switch (action.type) {
        /**
         * Sets new list of incomplete Tasks
         */
        case TaskManagerActionsEnum.Set:
            return {
                ...state,
                tasks: [...state.tasks, ...action.payload.tasks],
            };

        /**
         * Moves selected Task from list of incomplete tasks to list of completed tasks
         */
        case TaskManagerActionsEnum.Complete:
            // Using Array.prototype.reduce will prevent double array traversal and ensure immutability
            // Another option is to use Array.prototype.find and Array.prototype.filter, however that would increase the time complexity. Space complexity would stay the same
            return state.tasks.reduce(
                (localState, task) => {
                    const destinationArray =
                        task.id === action.payload.taskId ? 'completed' : 'tasks';

                    localState[destinationArray] = [...localState[destinationArray], task];

                    return localState;
                },
                { tasks: [], completed: state.completed } as TaskManagerState
            );

        /**
         * Current state without changes
         * Typescript Type Guard should prevent reaching this code
         */
        default:
            return state;
    }
};
