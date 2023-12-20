import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSelect, InvSelectOnChange } from 'common/components';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { setScheduler } from 'features/parameters/store/generationSlice';
import { SCHEDULER_OPTIONS } from 'features/parameters/types/constants';
import { isParameterScheduler } from 'features/parameters/types/parameterSchemas';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const ParamScheduler = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const scheduler = useAppSelector((state) => state.generation.scheduler);

  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!isParameterScheduler(v?.value)) {
        return;
      }
      dispatch(setScheduler(v.value));
    },
    [dispatch]
  );

  const value = useMemo(
    () => SCHEDULER_OPTIONS.find((o) => o.value === scheduler),
    [scheduler]
  );

  return (
    <IAIInformationalPopover feature="paramScheduler">
      <InvControl label={t('parameters.scheduler')}>
        <InvSelect
          value={value}
          options={SCHEDULER_OPTIONS}
          onChange={onChange}
        />
      </InvControl>
    </IAIInformationalPopover>
  );
};

export default memo(ParamScheduler);
