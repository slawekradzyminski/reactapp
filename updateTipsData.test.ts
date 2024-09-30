import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { updateTipsData } from './updateTipsData.js';
import { beforeAll, describe, expect, test } from 'vitest';
import { Tip } from './src/types/domain.ts';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('updateTipsData', () => {
  const tipsDataForUnitTestFile = path.join(__dirname, 'tipsForUnitTest.json');

  beforeAll(() => {
    updateTipsData();
  });

  test('all tips from tipsForUnitTest.json are present in the output', async () => {
    // given
    const tipsData = JSON.parse(fs.readFileSync(tipsDataForUnitTestFile, 'utf8'));
    const outputFile = path.join(__dirname, 'src', 'data', 'tipsData.json');
    const outputData = JSON.parse(fs.readFileSync(outputFile, 'utf8'));

    // when
    const checkPromises = tipsData.map(async (expectedTip: Tip) => {
      const outputTip = outputData.find((tip: Tip) => tip.title === expectedTip.title);

      // then
      expect(outputTip).toBeDefined();
      expect(outputTip.content).toBe(expectedTip.content);
    });

    // Wait for all checks to complete
    await Promise.all(checkPromises);
  });
});
