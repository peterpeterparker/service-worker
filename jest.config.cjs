module.exports = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	roots: ['src/'],
	testMatch: ['**/src/**/?(*.)+(spec|test).[jt]s?(x)'],
	setupFiles: [`<rootDir>/test-setup.ts`, 'fake-indexeddb/auto'],
	moduleDirectories: ['node_modules'],
	transform: {
		"^.+\\.(t|j)s$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.spec.json",
			},
		]
	},
	timers: 'fake',
	reporters: ['default', 'jest-junit'],
	globals: {
		'ts-jest': {
			tsconfig: {
				allowJs: true
			}
		}
	}
};
