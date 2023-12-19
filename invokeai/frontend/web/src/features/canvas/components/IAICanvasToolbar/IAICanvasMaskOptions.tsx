import { Box, ButtonGroup, Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import {
  InvButton,
  InvControl,
  InvCheckbox,
  InvIconButton,
} from 'common/components';
import IAIColorPicker from 'common/components/IAIColorPicker';
import IAIPopover from 'common/components/IAIPopover';
import { canvasMaskSavedToGallery } from 'features/canvas/store/actions';
import { isStagingSelector } from 'features/canvas/store/canvasSelectors';
import {
  clearMask,
  setIsMaskEnabled,
  setLayer,
  setMaskColor,
  setShouldPreserveMaskedArea,
} from 'features/canvas/store/canvasSlice';
import { rgbaColorToString } from 'features/canvas/util/colorToString';
import { ChangeEvent, memo, useCallback } from 'react';
import { RgbaColor } from 'react-colorful';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import { FaMask, FaSave, FaTrash } from 'react-icons/fa';

export const selector = createMemoizedSelector(
  [stateSelector, isStagingSelector],
  ({ canvas }, isStaging) => {
    const { maskColor, layer, isMaskEnabled, shouldPreserveMaskedArea } =
      canvas;

    return {
      layer,
      maskColor,
      maskColorString: rgbaColorToString(maskColor),
      isMaskEnabled,
      shouldPreserveMaskedArea,
      isStaging,
    };
  }
);
const IAICanvasMaskOptions = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    layer,
    maskColor,
    isMaskEnabled,
    shouldPreserveMaskedArea,
    isStaging,
  } = useAppSelector(selector);

  useHotkeys(
    ['q'],
    () => {
      handleToggleMaskLayer();
    },
    {
      enabled: () => !isStaging,
      preventDefault: true,
    },
    [layer]
  );

  useHotkeys(
    ['shift+c'],
    () => {
      handleClearMask();
    },
    {
      enabled: () => !isStaging,
      preventDefault: true,
    },
    []
  );

  useHotkeys(
    ['h'],
    () => {
      handleToggleEnableMask();
    },
    {
      enabled: () => !isStaging,
      preventDefault: true,
    },
    [isMaskEnabled]
  );

  const handleToggleMaskLayer = useCallback(() => {
    dispatch(setLayer(layer === 'mask' ? 'base' : 'mask'));
  }, [dispatch, layer]);

  const handleClearMask = useCallback(() => {
    dispatch(clearMask());
  }, [dispatch]);

  const handleToggleEnableMask = useCallback(() => {
    dispatch(setIsMaskEnabled(!isMaskEnabled));
  }, [dispatch, isMaskEnabled]);

  const handleSaveMask = useCallback(async () => {
    dispatch(canvasMaskSavedToGallery());
  }, [dispatch]);

  const handleChangePreserveMaskedArea = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setShouldPreserveMaskedArea(e.target.checked));
    },
    [dispatch]
  );

  const handleChangeMaskColor = useCallback(
    (newColor: RgbaColor) => {
      dispatch(setMaskColor(newColor));
    },
    [dispatch]
  );

  return (
    <IAIPopover
      triggerComponent={
        <ButtonGroup>
          <InvIconButton
            aria-label={t('unifiedCanvas.maskingOptions')}
            tooltip={t('unifiedCanvas.maskingOptions')}
            icon={<FaMask />}
            isChecked={layer === 'mask'}
            isDisabled={isStaging}
          />
        </ButtonGroup>
      }
    >
      <Flex direction="column" gap={2}>
        <InvControl label={`${t('unifiedCanvas.enableMask')} (H)`}>
          <InvCheckbox
            isChecked={isMaskEnabled}
            onChange={handleToggleEnableMask}
          />
        </InvControl>
        <InvControl label={t('unifiedCanvas.preserveMaskedArea')}>
          <InvCheckbox
            isChecked={shouldPreserveMaskedArea}
            onChange={handleChangePreserveMaskedArea}
          />
        </InvControl>
        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <IAIColorPicker color={maskColor} onChange={handleChangeMaskColor} />
        </Box>
        <InvButton size="sm" leftIcon={<FaSave />} onClick={handleSaveMask}>
          {t('unifiedCanvas.saveMask')}
        </InvButton>
        <InvButton size="sm" leftIcon={<FaTrash />} onClick={handleClearMask}>
          {t('unifiedCanvas.clearMask')}
        </InvButton>
      </Flex>
    </IAIPopover>
  );
};

export default memo(IAICanvasMaskOptions);
