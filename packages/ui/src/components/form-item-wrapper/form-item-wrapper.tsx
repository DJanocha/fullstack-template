'use client'
import { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type FormItemWrapperProps = {
  errorMsg?: string
  label?: string
  children: ReactNode
  className?: string
  labelSpacing?: 'default' | 'small'
}

export const FormItemWrapper = ({
  children,
  errorMsg,
  label,
  className,
  labelSpacing
}: FormItemWrapperProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col gap-2 w-full',
        labelSpacing === 'small' ? 'gap-[2px]' : 'gap-2',
        className
      )}
    >
      {label}
      {children}
      {errorMsg && (
        <span className="text-red-500 text-sm">{errorMsg ?? ' '}</span>
      )}
    </div>
  )
}
