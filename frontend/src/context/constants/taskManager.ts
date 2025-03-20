/**
 * Enum representing different action types used in the Task Manager
 *
 * TaskManagerActionsEnum.Set - Sets new list of incomplete Tasks
 * TaskManagerActionsEnum.Complete - Moves selected Task from list of incomplete tasks to list of completed tasks
 */
export enum TaskManagerActionsEnum {
    Set = 'SET_TASKS',
    Complete = 'COMPLETE_TASK',
}
