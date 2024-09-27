import React from 'react';

import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface InputFieldProps<TFieldValues extends FieldValues> {
  placeholder: string;
  name: Path<TFieldValues>;
  type: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
  className?: string;
}

export const InputField = <TFieldValues extends FieldValues>({
  placeholder,
  name,
  type,
  register,
  error,
  className,
}: InputFieldProps<TFieldValues>) => {
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        {...register(name)}
        className={cn('w-full p-2 border rounded', className)}
      />
      {error && <span className="text-danger text-sm">{error.message}</span>}
    </>
  );
};
