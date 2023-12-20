import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import ParamSymmetryCollapse from 'features/parameters/components/Symmetry/ParamSymmetryCollapse';
import { memo } from 'react';
import ImageToImageTabCoreParameters from './ImageToImageTabCoreParameters';
import { Prompts } from 'features/parameters/components/Prompts';
import LoRACollapse from 'features/lora/components/LoRACollapse';

const ImageToImageTabParameters = () => {
  return (
    <>
      <Prompts />
      <ImageToImageTabCoreParameters />
      <ControlAdaptersCollapse />
      <LoRACollapse />
      <ParamDynamicPromptsCollapse />
      <ParamSymmetryCollapse />
      <ParamAdvancedCollapse />
    </>
  );
};

export default memo(ImageToImageTabParameters);
