import {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
  UseFormSetValue,
} from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UpdateSnippetFormData } from '@/app/hooks/use-update-snippet-form';

interface SwitchFieldProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
  setValue: (value: boolean) => void;
  defaultValue?: boolean;
}

export const SwitchField = <TFieldValues extends FieldValues>({
  label,
  name,
  register,
  error,
  setValue,
  defaultValue = false,
}: SwitchFieldProps<TFieldValues>) => {
  return (
    <div className="flex pt-2 items-center justify-between w-full space-x-2">
      <Label htmlFor={name}>{label}</Label>
      <Switch
        id={name}
        {...register(name)}
        checked={defaultValue}
        onCheckedChange={setValue}
      />
      {error && <span className="text-danger text-sm">{error.message}</span>}
    </div>
  );
};
