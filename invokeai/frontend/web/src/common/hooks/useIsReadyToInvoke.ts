import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from 'app/store/storeHooks';
import { defaultSelectorOptions } from 'app/store/util/defaultMemoizeOptions';
import { validateSeedWeights } from 'common/util/seedWeightPairs';
import { generationSelector } from 'features/parameters/store/generationSelectors';
import { systemSelector } from 'features/system/store/systemSelectors';
import { activeTabNameSelector } from 'features/ui/store/uiSelectors';

const readinessSelector = createSelector(
  [generationSelector, systemSelector, activeTabNameSelector],
  (generation, system, activeTabName) => {
    const { shouldGenerateVariations, seedWeights, initialImage, seed } =
      generation;

    const { isProcessing, isConnected } = system;

    let isReady = true;
    const reasonsWhyNotReady: string[] = [];

    if (activeTabName === 'img2img' && !initialImage) {
      isReady = false;
      reasonsWhyNotReady.push('No initial image selected');
    }

    // TODO: job queue
    // Cannot generate if already processing an image
    if (isProcessing) {
      isReady = false;
      reasonsWhyNotReady.push('System Busy');
    }

    // Cannot generate if not connected
    if (!isConnected) {
      isReady = false;
      reasonsWhyNotReady.push('System Disconnected');
    }

    // Cannot generate variations without valid seed weights
    if (
      shouldGenerateVariations &&
      (!(validateSeedWeights(seedWeights) || seedWeights === '') || seed === -1)
    ) {
      isReady = false;
      reasonsWhyNotReady.push('Seed-Weights badly formatted.');
    }

    // All good
    return { isReady, reasonsWhyNotReady };
  },
  defaultSelectorOptions
);

export const useIsReadyToInvoke = () => {
  const { isReady } = useAppSelector(readinessSelector);
  return isReady;
};