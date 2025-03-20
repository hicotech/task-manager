import { Task, TaskList } from '@task-manager/shared-library';
import { Dispatch, ReactNode } from 'react';
import { TaskManagerActionsEnum } from '../constants/taskManager';

/**
 * State Manager state structure
 *
 * Provides list of incomplete tasks in 'tasks' property and list of completed tasks in 'completed' property
 */
export interface TaskManagerState {
    tasks: TaskList['tasks'];
    completed: TaskList['tasks'];
}

/**
 * Type guarded discriminated union for Task Manager actions
 */
export type TaskManagerAction =
    | {
          type: TaskManagerActionsEnum.Set;
          payload: {
              tasks: TaskList['tasks'];
          };
      }
    | {
          type: TaskManagerActionsEnum.Complete;
          payload: {
              taskId: Task['id'];
          };
      };

/**
 * Task Manager context with current state and dispatch callback function
 */
export interface TaskManagerContext {
    state: TaskManagerState;
    dispatch: Dispatch<TaskManagerAction>;
}

/**
 * Task Manager provider for nested components
 */
export interface TaskManagerProvider {
    children?: ReactNode;
}
