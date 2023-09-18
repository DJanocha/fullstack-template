import { cva, VariantProps } from 'class-variance-authority'
import type { TypedOmit } from '@monorepo/shared/types/common'
import { forwardRef, ReactNode, type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { LoadingSpinner } from '../loading-spinner/loading-spinner'

const buttonVariants = cva(
  'flex  flex-row items-center justify-center rounded-lg transition-colors whitespace-nowrap font-bold font-inter gap-2',
  {
    variants: {
      variant: {
        default: 'border-none text-white bg-green-600 hover:bg-green-600/80',
        outline:
          'border border-green-600 hover:border-green-600/80 text-green-600 hover:text-green-600/80 bg-white',
        link: 'text-green-600 hover:text-green-600/80 bg-transparent p-1'
      },
      size: {
        default: 'h-12 py-3.5 px-5 text-[16px] leading-[23.2px] gap-3 ',
        small: 'gap-1 p-0'
      },
      disabled: {
        true: 'pointer-events-none  opacity-75 cursor-not-allowed',
        false: 'cursor-pointer opacity-100'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      disabled: false
    }
  }
)

export interface ButtonProps
  extends TypedOmit<ComponentProps<'button'>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  iconBefore?: ReactNode
  iconAfter?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled = false,
      type,
      iconBefore = null,
      iconAfter = null,
      isLoading,
      children,
      ...buttonProps
    },
    ref
  ) => {
    return (
      <button
        disabled={disabled ?? false}
        type={type ?? 'button'}
        className={twMerge(
          buttonVariants({ variant, size, disabled }),
          isLoading ? 'pointer-events-none opacity-70' : '',
          className
        )}
        ref={ref}
        {...buttonProps}
      >
        {iconBefore}
        {children}
        {iconAfter}
        {isLoading ? <LoadingSpinner /> : null}
      </button>
    )
  }
)
Button.displayName = 'Button'
