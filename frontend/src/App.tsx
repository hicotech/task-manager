import type { Task, TaskList } from '@task-manager/shared-library';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';
import EmptyState from './components/EmptyState/EmptyState';
import Tasks from './components/Tasks/Tasks';
import { VITE_BACKEND_HOST, VITE_TASKS_ENDPOINT } from './constants';
import { completeTask, setTasks } from './context/actions/tasksManager';
import { useTasksManager } from './context/TaskManager';

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    height: 100%;

    &:has(:nth-child(n + 2)) {
        margin-top: 1.375rem;
        justify-content: initial;
    }
`;

const App = () => {
    // Use Abort Controller to abort any hanging API calls on new request
    const abortController = useRef<AbortController>(null);

    // Simple local state management with useState for TaskList name
    // Eventually could be implemented into Task Manager context
    const [tasksListName, setTasksListName] = useState<TaskList['name']>();

    // Globally available Task Manager
    const { state, dispatch } = useTasksManager();

    // Use ENVIRONMENT variables for Host and Endpoint data
    const url = `${VITE_BACKEND_HOST}/api/${VITE_TASKS_ENDPOINT}`;

    /**
     * Handle fetching data from backend and abort any hanging calls when executed
     *
     * Prepare TaskManagerAction object and pass it to Task Manager dispatch function which will set list of incomplete Tasks in global context state
     * Set TaskList name to local state
     */
    const fetchData = async () => {
        if (abortController.current) {
            abortController.current.abort();
        }

        abortController.current = new AbortController();

        try {
            const response = await fetch(url, {
                method: 'GET',
                signal: abortController.current.signal,
            });
            const result = await response.json();

            setTasksListName(result.name);
            dispatch(setTasks(result.tasks));
        } catch (error) {
            throw new Error(`Error fetching data: ${error}`);
        }
    };

    /**
     * Handle onCompleteTask callback
     *
     * Prepare TaskManagerAction object and pass it to Task Manager dispatch function which will set Task as completed in global context state
     *
     * @param taskId UUID of Task to be set as completed
     */
    const onCompleteTask = (taskId: Task['id']) => {
        dispatch(completeTask(taskId));
    };

    // Component unmount cleanup
    useEffect(() => {
        return () => {
            abortController.current?.abort();
        };
    }, []);

    return (
        <Container>
            {tasksListName && Boolean(state.tasks.length) ? (
                <Tasks
                    name={tasksListName}
                    tasks={state.tasks}
                    onButtonClick={onCompleteTask}
                    data-testid="tasks-list"
                />
            ) : (
                <ContentContainer>
                    <EmptyState onRequestTasks={fetchData} data-testid="empty-state" />
                    {Boolean(state.completed.length) && (
                        <CompletedTasks tasks={state.completed} data-testid="completed-list" />
                    )}
                </ContentContainer>
            )}
        </Container>
    );
};

export default App;
