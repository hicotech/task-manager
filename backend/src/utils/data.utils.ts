import type { TaskList, TaskType } from '@task-manager/shared-library';

/**
 * Generates random TaskList data
 *
 * Example:
 * {
 *     "name": "Lorem ipsum dolor sit amet 76",
 *     "tasks": [
 *         {
 *             "id": "b6586431-10cc-4602-bb61-dcf4a88fbb95",
 *             "name": "Task 603",
 *             "type": "rectangle"
 *         },
 *         {
 *             "id": "386a319b-3f9a-4152-9f89-1a39dee1b516",
 *             "name": "Task 231",
 *             "type": "circle"
 *         },
 *         {
 *             "id": "82fb14d1-448e-4178-91b8-677e5256a443",
 *             "name": "Task 993",
 *             "type": "polygon"
 *         }
 *     ]
 * }
 *
 * @returns {TaskList}
 */
export const getRandomData = (): TaskList => {
    const itemsTypes: TaskType[] = ['polygon', 'rectangle', 'circle'];

    const data: TaskList = {
        name: `Lorem ipsum dolor sit amet ${Math.floor(Math.random() * 100)}`,
        tasks: [],
    };

    for (let index = 0; index < Math.floor(Math.random() * 10) + 1; index++) {
        data.tasks.push({
            id: crypto.randomUUID(),
            name: `Task ${Math.floor(Math.random() * 1000)}`,
            type: itemsTypes[Math.floor(Math.random() * itemsTypes.length)],
        });
    }

    return data;
};
