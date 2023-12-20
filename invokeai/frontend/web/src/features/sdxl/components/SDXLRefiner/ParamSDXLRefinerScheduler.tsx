import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { InvControl, InvSelect, InvSelectOnChange } from 'common/components';
import { SCHEDULER_OPTIONS } from 'features/parameters/types/constants';
import { isParameterScheduler } from 'features/parameters/types/parameterSchemas';
import { setRefinerScheduler } from 'features/sdxl/store/sdxlSlice';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsRefinerAvailable } from 'services/api/hooks/useIsRefinerAvailable';

const ParamSDXLRefinerScheduler = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const refinerScheduler = useAppSelector(
    (state) => state.sdxl.refinerScheduler
  );
  const isRefinerAvailable = useIsRefinerAvailable();

  const onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!isParameterScheduler(v?.value)) {
        return;
      }
      dispatch(setRefinerScheduler(v.value));
    },
    [dispatch]
  );

  const value = useMemo(
    () => SCHEDULER_OPTIONS.find((o) => o.value === refinerScheduler),
    [refinerScheduler]
  );

  return (
    <InvControl label={t('sdxl.scheduler')} isDisabled={!isRefinerAvailable}>
      <InvSelect
        value={value}
        options={SCHEDULER_OPTIONS}
        onChange={onChange}
      />
    </InvControl>
  );
};

export default memo(ParamSDXLRefinerScheduler);
