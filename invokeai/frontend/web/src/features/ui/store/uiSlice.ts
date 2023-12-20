import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { initialImageChanged } from 'features/parameters/store/generationSlice';
import { InvokeTabName } from './tabMap';
import { UIState } from './uiTypes';

export const initialUIState: UIState = {
  activeTab: 'txt2img',
  shouldShowImageDetails: false,
  shouldShowExistingModelsInSearch: false,
  shouldHidePreview: false,
  shouldShowProgressInViewer: true,
  shouldAutoChangeDimensions: false,
  globalMenuCloseTrigger: 0,
  panels: {},
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<InvokeTabName>) => {
      state.activeTab = action.payload;
    },
    setShouldShowImageDetails: (state, action: PayloadAction<boolean>) => {
      state.shouldShowImageDetails = action.payload;
    },
    setShouldHidePreview: (state, action: PayloadAction<boolean>) => {
      state.shouldHidePreview = action.payload;
    },
    setShouldShowExistingModelsInSearch: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.shouldShowExistingModelsInSearch = action.payload;
    },
    setShouldShowProgressInViewer: (state, action: PayloadAction<boolean>) => {
      state.shouldShowProgressInViewer = action.payload;
    },
    setShouldAutoChangeDimensions: (state, action: PayloadAction<boolean>) => {
      state.shouldAutoChangeDimensions = action.payload;
    },
    bumpGlobalMenuCloseTrigger: (state) => {
      state.globalMenuCloseTrigger += 1;
    },
    panelsChanged: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.panels[action.payload.name] = action.payload.value;
    },
  },
  extraReducers(builder) {
    builder.addCase(initialImageChanged, (state) => {
      state.activeTab = 'img2img';
    });
  },
});

export const {
  setActiveTab,
  setShouldShowImageDetails,
  setShouldShowExistingModelsInSearch,
  setShouldHidePreview,
  setShouldShowProgressInViewer,
  setShouldAutoChangeDimensions,
  bumpGlobalMenuCloseTrigger,
  panelsChanged,
} = uiSlice.actions;

export default uiSlice.reducer;
