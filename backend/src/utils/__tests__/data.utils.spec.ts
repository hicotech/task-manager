import { TaskList } from '@task-manager/shared-library';
import { getRandomData } from '../data.utils';

describe('Tasks', () => {
    const testData: TaskList = {
        name: expect.stringMatching(/Lorem ipsum dolor sit amet \b(100|[1-9]?[0-9])\b/),
        tasks: expect.arrayContaining([
            {
                id: expect.stringMatching(
                    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
                ),
                name: expect.stringMatching(/Task \b([1-9]|[1-9][0-9]|[1-9][0-9]{2}|1000)/),
                type: expect.stringMatching(/circle|rectangle|polygon/),
            },
        ]),
    };

    it('Get Random Data', () => {
        const data = getRandomData();

        expect(data).toMatchObject<TaskList>(testData);
        expect(data.tasks.length).toBeGreaterThanOrEqual(1);
        expect(data.tasks.length).toBeLessThanOrEqual(10);
    });
});
