'use client'
import { omit } from 'lodash'
import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  FormItemWrapper,
  FormItemWrapperProps
} from '../form-item-wrapper/form-item-wrapper'
import type { TypedOmit } from '@monorepo/shared/types/common'

export type FormInputProps = TypedOmit<FormItemWrapperProps, 'children'> &
  ComponentProps<'input'>

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ errorMsg, label, labelSpacing, ...inputProps }, ref) => {
    return (
      <FormItemWrapper
        errorMsg={errorMsg}
        label={label}
        labelSpacing={labelSpacing}
      >
        <input
          ref={ref}
          className={twMerge(
            'rounded-lg h-11 overflow-hidden px-2',
            inputProps.className
          )}
          {...omit(inputProps, 'className')}
        />
      </FormItemWrapper>
    )
  }
)

FormInput.displayName = 'FormInput'
