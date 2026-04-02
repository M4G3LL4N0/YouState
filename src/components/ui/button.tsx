import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-zinc-800 text-zinc-50 hover:bg-zinc-700',
        primary: 'bg-blue-600 text-white hover:bg-blue-500',
        secondary: 'bg-zinc-700 text-zinc-50 hover:bg-zinc-600',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'px-3 py-1 text-sm',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  asChild?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
