import { TaskType } from './TaskType';

export interface Task {
    /**
     * Unique ID for the task
     */
    id: string;

    /**
     * Name of the task
     */
    name: string;

    /**
     * Type of the task
     *
     * @param {TaskType} rectangle Rectangle type of task
     * @param {TaskType} circle Circle type of task
     * @param {TaskType} polygon Polygon type of task
     */
    type: TaskType;
}
