import { Tooltip } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSlider } from 'common/components';
import { setHrfStrength } from 'features/parameters/store/generationSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ generation, hotkeys, config }) => {
    const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
      config.sd.hrfStrength;
    const { hrfStrength, hrfEnabled } = generation;
    const step = hotkeys.shift ? fineStep : coarseStep;

    return {
      hrfStrength,
      initial,
      min,
      sliderMax,
      inputMax,
      step,
      hrfEnabled,
    };
  }
);

const ParamHrfStrength = () => {
  const { hrfStrength, initial, min, sliderMax, step, hrfEnabled } =
    useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleHrfStrengthReset = useCallback(() => {
    dispatch(setHrfStrength(initial));
  }, [dispatch, initial]);

  const handleHrfStrengthChange = useCallback(
    (v: number) => {
      dispatch(setHrfStrength(v));
    },
    [dispatch]
  );

  return (
    <Tooltip label={t('hrf.strengthTooltip')} placement="right" hasArrow>
      <InvControl
        label={t('parameters.denoisingStrength')}
        isDisabled={!hrfEnabled}
      >
        <InvSlider
          min={min}
          max={sliderMax}
          step={step}
          value={hrfStrength}
          onChange={handleHrfStrengthChange}
          marks
          withNumberInput
          onReset={handleHrfStrengthReset}
        />
      </InvControl>
    </Tooltip>
  );
};

export default memo(ParamHrfStrength);
