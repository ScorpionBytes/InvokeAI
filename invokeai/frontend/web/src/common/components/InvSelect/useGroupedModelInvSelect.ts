import { EntityState } from '@reduxjs/toolkit';
import { GroupBase } from 'chakra-react-select';
import { groupBy, map, reduce } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import {
  AnyModelConfigEntity,
  getModelId,
} from 'services/api/endpoints/models';
import { InvSelectOnChange, InvSelectOption } from './types';
import { useTranslation } from 'react-i18next';

type UseGroupedModelInvSelectArg<T extends AnyModelConfigEntity> = {
  modelEntities: EntityState<T, string> | undefined;
  selectedModel?: Pick<T, 'base_model' | 'model_name' | 'model_type'> | null;
  onChange: (value: T | null) => void;
  getIsDisabled?: (model: T) => boolean;
  isLoading?: boolean;
};

type UseGroupedModelInvSelectReturn = {
  value: InvSelectOption | undefined | null;
  options: GroupBase<InvSelectOption>[];
  onChange: InvSelectOnChange;
  placeholder: string;
  noOptionsMessage: () => string;
};

export const useGroupedModelInvSelect = <T extends AnyModelConfigEntity>(
  arg: UseGroupedModelInvSelectArg<T>
): UseGroupedModelInvSelectReturn => {
  const { t } = useTranslation();
  const { modelEntities, selectedModel, getIsDisabled, onChange, isLoading } =
    arg;
  const options = useMemo(() => {
    if (!modelEntities) {
      return [];
    }
    const modelEntitiesArray = map(modelEntities.entities);
    const groupedModels = groupBy(modelEntitiesArray, 'base_model');
    const _options = reduce(
      groupedModels,
      (acc, val, label) => {
        acc.push({
          label,
          options: val.map((model) => ({
            label: model.model_name,
            value: model.id,
            isDisabled: getIsDisabled ? getIsDisabled(model) : false,
          })),
        });
        return acc;
      },
      [] as GroupBase<InvSelectOption>[]
    );
    return _options;
  }, [getIsDisabled, modelEntities]);

  const value = useMemo(
    () =>
      options
        .flatMap((o) => o.options)
        .find((m) =>
          selectedModel ? m.value === getModelId(selectedModel) : false
        ),
    [options, selectedModel]
  );

  const _onChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!v) {
        onChange(null);
        return;
      }
      const model = modelEntities?.entities[v.value];
      if (!model) {
        onChange(null);
        return;
      }
      onChange(model);
    },
    [modelEntities?.entities, onChange]
  );

  const placeholder = useMemo(() => {
    if (isLoading) {
      return t('common.loading');
    }

    if (options.length === 0) {
      return t('models.noModelsAvailable');
    }

    return t('models.selectModel');
  }, [isLoading, options, t]);

  const noOptionsMessage = useCallback(() => t('models.noMatchingModels'), [t]);

  return { options, value, onChange: _onChange, placeholder, noOptionsMessage };
};
