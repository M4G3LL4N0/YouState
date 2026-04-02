import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30',
        secondary: 'bg-zinc-800/50 text-zinc-100 hover:bg-zinc-800/70 border border-zinc-700/50 hover:border-zinc-600/50',
        outline: 'border border-zinc-700/50 bg-transparent hover:bg-zinc-800/30 hover:border-zinc-600/50',
        ghost: 'hover:bg-zinc-800/30 text-zinc-300 hover:text-zinc-50',
        premium: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30',
      },
      size: {
        default: 'h-10 py-2 px-6',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
