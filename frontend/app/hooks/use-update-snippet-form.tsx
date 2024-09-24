'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  updateSnippetContentSchema,
  UpdateSnippetSchema,
} from '../schemas/update-snippet-schema';
import { z } from 'zod';
import { updateSnippet } from '@/actions/snippets';
import { useSession } from 'next-auth/react';
import { Snippet } from '@/interfaces/snippet';

export type UpdateSnippetFormData = z.infer<typeof UpdateSnippetSchema>;
export type UpdateSnippetContent = z.infer<typeof updateSnippetContentSchema>;

export const useUpdateSnippetForm = ({
  initialData,
}: {
  initialData: Snippet;
}) => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UpdateSnippetFormData>({
    resolver: zodResolver(UpdateSnippetSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: UpdateSnippetFormData) => {
    try {
      if (!session) {
        console.error('Session not found');
        return;
      }

      await updateSnippet(initialData.id, session?.user.accessToken, data).then(
        () => {
          window.location.reload();
        },
      );
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    setValue,
  };
};
