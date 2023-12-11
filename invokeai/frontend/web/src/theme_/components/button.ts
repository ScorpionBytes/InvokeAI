import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle((props) => {
  const { colorScheme: c } = props;
  // must specify `_disabled` colors if we override `_hover`, else hover on disabled has no styles

  if (c === 'base') {
    const _disabled = {
      bg: 'base.700',
      color: 'base.500',
      svg: {
        fill: 'base.500',
      },
      opacity: 1,
    };

    const data_progress = {
      bg: 'none',
      color: 'base.500',
      svg: {
        fill: 'base.500',
      },
      opacity: 1,
    };

    return {
      bg: 'base.600',
      color: 'base.100',
      borderRadius: 'base',
      svg: {
        fill: 'base.100',
      },
      _hover: {
        bg: 'base.500',
        color: 'base.50',
        svg: {
          fill: 'base.50',
        },
        _disabled,
      },
      _disabled,
      '&[data-progress="true"]': { ...data_progress, _hover: data_progress },
    };
  }

  const _disabled = {
    bg: `${c}.700`,
    color: `${c}.500`,
    svg: {
      fill: `${c}.500`,
      filter: 'unset',
    },
    opacity: 0.7,
    filter: 'saturate(65%)',
  };

  return {
    bg: `${c}.600`,
    color: `base.100`,
    borderRadius: 'base',
    svg: {
      fill: `base.100`,
    },
    _disabled,
    _hover: {
      bg: `${c}.500`,
      color: `base.50`,
      svg: {
        fill: `base.50`,
      },
      _disabled,
    },
  };
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  defaultProps: {
    colorScheme: 'base',
  },
});