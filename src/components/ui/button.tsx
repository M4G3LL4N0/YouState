import { ButtonProps } from './types';
import { classVarianceAuthority } from '@radix-ui/react-slot';
import { styled } from '@mui/material/styles';

const buttonVariants = {
  default: {
    variant: 'default',
    size: 'default',
  },
  primary: {
    variant: 'primary',
    size: 'default',
  },
  secondary: {
    variant: 'secondary',
    size: 'default',
  },
  small: {
    variant: 'default',
    size: 'sm',
  },
  large: {
    variant: 'default',
    size: 'lg',
  },
};

const ButtonBase = styled('button')((props) => ({
  ...props,
  appearance: 'none',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    opacity: 0.9,
  },
}));

const Button = classVarianceAuthority(class ButtonBase, {
  asChild: true,
});

Button.displayName = 'Button';

export { Button, buttonVariants };
