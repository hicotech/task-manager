import { createContext, useContext, useReducer } from 'react';
import { tasksManagerReducer } from './reducers/taskManager';
import type {
    TaskManagerContext,
    TaskManagerProvider,
    TaskManagerState,
} from './types/taskManager';

// Initial Task Manager context structure
const initialState: TaskManagerState = {
    tasks: [],
    completed: [],
};

// Create Task Manager context with initial data
const TaskManagerContext = createContext<TaskManagerContext>({
    state: initialState,
    dispatch: () => {
        throw new Error('Hook useTasksManager used outside of the Provider');
    },
});

/**
 * Task Manager Provider Component
 *
 * Provides access to Task Manager state object and dispatch function to any nested child components through useTasksManager hook
 * Allows nested child components to access the state and dispatch actions to modify the state
 *
 * @param children ReactNode children
 * @returns TaskManagerContext.Provider
 */
export const TaskManager = ({ children }: TaskManagerProvider) => {
    const [state, dispatch] = useReducer(tasksManagerReducer, initialState);

    return (
        <TaskManagerContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskManagerContext.Provider>
    );
};

/**
 * Task Manager Hook for accessing Task Manager Context
 *
 * @returns Current state object and dispatch function
 */
export const useTasksManager = () => {
    const context = useContext(TaskManagerContext);

    if (!context) {
        throw new Error('Hook useTasksManager must be used within a TaskManager provider');
    }

    return context;
};
