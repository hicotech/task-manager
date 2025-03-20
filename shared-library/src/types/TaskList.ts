import { Task } from './Task';

export interface TaskList {
    /**
     * Name of the task list
     */
    name: string;

    /**
     * Array of tasks in task list
     */
    tasks: Task[];
}
