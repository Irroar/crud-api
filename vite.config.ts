import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        include: ['./__tests/index.test.ts']
    }
});