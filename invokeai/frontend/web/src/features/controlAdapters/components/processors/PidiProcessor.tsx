import { InvControl, InvSlider, InvSwitch } from 'common/components';
import { CONTROLNET_PROCESSORS } from 'features/controlAdapters/store/constants';
import { RequiredPidiImageProcessorInvocation } from 'features/controlAdapters/store/types';
import { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useProcessorNodeChanged } from 'features/controlAdapters/components/hooks/useProcessorNodeChanged';
import ProcessorWrapper from './common/ProcessorWrapper';

const DEFAULTS = CONTROLNET_PROCESSORS.pidi_image_processor
  .default as RequiredPidiImageProcessorInvocation;

type Props = {
  controlNetId: string;
  processorNode: RequiredPidiImageProcessorInvocation;
  isEnabled: boolean;
};

const PidiProcessor = (props: Props) => {
  const { controlNetId, processorNode, isEnabled } = props;
  const { image_resolution, detect_resolution, scribble, safe } = processorNode;
  const processorChanged = useProcessorNodeChanged();
  const { t } = useTranslation();

  const handleDetectResolutionChanged = useCallback(
    (v: number) => {
      processorChanged(controlNetId, { detect_resolution: v });
    },
    [controlNetId, processorChanged]
  );

  const handleImageResolutionChanged = useCallback(
    (v: number) => {
      processorChanged(controlNetId, { image_resolution: v });
    },
    [controlNetId, processorChanged]
  );

  const handleDetectResolutionReset = useCallback(() => {
    processorChanged(controlNetId, {
      detect_resolution: DEFAULTS.detect_resolution,
    });
  }, [controlNetId, processorChanged]);

  const handleImageResolutionReset = useCallback(() => {
    processorChanged(controlNetId, {
      image_resolution: DEFAULTS.image_resolution,
    });
  }, [controlNetId, processorChanged]);

  const handleScribbleChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      processorChanged(controlNetId, { scribble: e.target.checked });
    },
    [controlNetId, processorChanged]
  );

  const handleSafeChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      processorChanged(controlNetId, { safe: e.target.checked });
    },
    [controlNetId, processorChanged]
  );

  return (
    <ProcessorWrapper>
      <InvControl
        label={t('controlnet.detectResolution')}
        isDisabled={!isEnabled}
      >
        <InvSlider
          value={detect_resolution}
          onChange={handleDetectResolutionChanged}
          onReset={handleDetectResolutionReset}
          min={0}
          max={4096}
          marks
          withNumberInput
        />
      </InvControl>
      <InvControl
        label={t('controlnet.imageResolution')}
        isDisabled={!isEnabled}
      >
        <InvSlider
          value={image_resolution}
          onChange={handleImageResolutionChanged}
          onReset={handleImageResolutionReset}
          min={0}
          max={4096}
          marks
          withNumberInput
        />
      </InvControl>
      <InvControl label={t('controlnet.scribble')} isDisabled={!isEnabled}>
        <InvSwitch isChecked={scribble} onChange={handleScribbleChanged} />
      </InvControl>
      <InvControl label={t('controlnet.safe')} isDisabled={!isEnabled}>
        <InvSwitch isChecked={safe} onChange={handleSafeChanged} />
      </InvControl>
    </ProcessorWrapper>
  );
};

export default memo(PidiProcessor);
