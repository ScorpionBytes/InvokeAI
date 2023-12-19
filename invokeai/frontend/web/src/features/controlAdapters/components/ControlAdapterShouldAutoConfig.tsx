import { useAppDispatch } from 'app/store/storeHooks';
import { InvControl, InvSwitch } from 'common/components';
import { controlAdapterAutoConfigToggled } from 'features/controlAdapters/store/controlAdaptersSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useControlAdapterIsEnabled } from 'features/controlAdapters/hooks/useControlAdapterIsEnabled';
import { useControlAdapterShouldAutoConfig } from 'features/controlAdapters/hooks/useControlAdapterShouldAutoConfig';
import { isNil } from 'lodash-es';

type Props = {
  id: string;
};

const ControlAdapterShouldAutoConfig = ({ id }: Props) => {
  const isEnabled = useControlAdapterIsEnabled(id);
  const shouldAutoConfig = useControlAdapterShouldAutoConfig(id);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleShouldAutoConfigChanged = useCallback(() => {
    dispatch(controlAdapterAutoConfigToggled({ id }));
  }, [id, dispatch]);

  if (isNil(shouldAutoConfig)) {
    return null;
  }

  return (
    <InvControl label={t('controlnet.autoConfigure')} isDisabled={!isEnabled}>
      <InvSwitch
        isChecked={shouldAutoConfig}
        onChange={handleShouldAutoConfigChanged}
      />
    </InvControl>
  );
};

export default memo(ControlAdapterShouldAutoConfig);
