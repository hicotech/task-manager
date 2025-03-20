import { TaskList } from '@task-manager/shared-library';
import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';
import * as TaskManagerContext from '../context/TaskManager';

jest.mock('../constants', () => ({
    VITE_BACKEND_HOST: 'test-backend-host',
    VITE_TASKS_ENDPOINT: 'test-tasks-endpoint',
}));

describe('App', () => {
    const testData: TaskList = {
        name: 'tasks-name',
        tasks: [
            {
                id: 'task-1',
                name: 'Task Circle',
                type: 'circle',
            },
            {
                id: 'task-2',
                name: 'Task Rectangle',
                type: 'rectangle',
            },
            {
                id: 'task-3',
                name: 'Task Polygon',
                type: 'polygon',
            },
        ],
    };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Renders Default', () => {
        const { container, queryByTestId } = render(<App />);

        expect(container).toMatchSnapshot();

        expect(queryByTestId('empty-state')).toBeInTheDocument();
        expect(queryByTestId('tasks-list')).not.toBeInTheDocument();
        expect(queryByTestId('completed-list')).not.toBeInTheDocument();
    });

    describe('Renders Tasks List', () => {
        it('When Completed List is empty', () => {
            // Mock local state value only once to prevent unwanted changes to other useState hooks
            jest.spyOn(React, 'useState').mockImplementationOnce(() => [testData.name, jest.fn()]);

            // Mock context state value
            jest.spyOn(TaskManagerContext, 'useTasksManager').mockImplementation(() => ({
                state: {
                    tasks: testData.tasks,
                    completed: [],
                },
                dispatch: jest.fn(),
            }));

            const { container, queryByTestId } = render(<App />);

            expect(container).toMatchSnapshot();

            expect(queryByTestId('empty-state')).not.toBeInTheDocument();
            expect(queryByTestId('tasks-list')).toBeInTheDocument();
            expect(queryByTestId('completed-list')).not.toBeInTheDocument();
        });

        it('When Completed List is not empty', () => {
            // Mock local state value only once to prevent unwanted changes to other useState hooks
            jest.spyOn(React, 'useState').mockImplementationOnce(() => [testData.name, jest.fn()]);

            // Mock context state value
            jest.spyOn(TaskManagerContext, 'useTasksManager').mockImplementation(() => ({
                state: {
                    tasks: testData.tasks.slice(0, 2),
                    completed: testData.tasks.slice(2, 3),
                },
                dispatch: jest.fn(),
            }));

            const { container, queryByTestId } = render(<App />);

            expect(container).toMatchSnapshot();

            expect(queryByTestId('empty-state')).not.toBeInTheDocument();
            expect(queryByTestId('tasks-list')).toBeInTheDocument();
            expect(queryByTestId('completed-list')).not.toBeInTheDocument();
        });
    });

    it('Renders Empty State and Completed List', () => {
        // Mock context state value
        jest.spyOn(TaskManagerContext, 'useTasksManager').mockImplementation(() => ({
            state: {
                tasks: [],
                completed: testData.tasks,
            },
            dispatch: jest.fn(),
        }));

        const { container, queryByTestId } = render(<App />);

        expect(container).toMatchSnapshot();

        expect(queryByTestId('empty-state')).toBeInTheDocument();
        expect(queryByTestId('tasks-list')).not.toBeInTheDocument();
        expect(queryByTestId('completed-list')).toBeInTheDocument();
    });
});
