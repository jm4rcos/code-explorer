import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, RegisterSchema } from '../schemas/register-schema';
import { signUp } from '@/actions/user-actions';

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
  };
};
