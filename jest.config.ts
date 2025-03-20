import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    roots: ['<rootDir>'],
    verbose: true,
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    preset: 'ts-jest',
};

export default config;
