import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Tip } from '../src/types/domain';
import { updateTipsData } from './updateTipsData.js';
import { beforeAll, describe, expect, test } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('updateTipsData', () => {
  const tipsDataForUnitTestFile = path.join(__dirname, 'tipsForUnitTest.json');
  const outputFile = path.join(__dirname, '..', 'src', 'data', 'tipsData.json');

  beforeAll(async () => {
    await updateTipsData();
  });

  test('all tips from tipsForUnitTest.json are present in the output', async () => {
    // given
    const tipsData: Tip[] = JSON.parse(fs.readFileSync(tipsDataForUnitTestFile, 'utf8'));
    const outputData: Tip[] = JSON.parse(fs.readFileSync(outputFile, 'utf8'));

    // when
    for (const expectedTip of tipsData) {
      const outputTip = outputData.find((tip: Tip) => tip.id === expectedTip.id);

      // then
      expect(outputTip).toBeDefined();
      expect(outputTip?.title).toBe(expectedTip.title);
      expect(outputTip?.content).toBe(expectedTip.content);
    }
  });
});
