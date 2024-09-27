'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Code2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { InputField } from '@/components/input-field';
import { CustomButton } from '@/components/ui/custom-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { createSnippet } from '@/actions/snippets';
import { CreateSnippetSchema } from '@/app/schemas/create-snippet-schema';

export type CreateSnippetFormData = z.infer<typeof CreateSnippetSchema>;

export function CreateSnippetModal() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSnippetFormData>({
    resolver: zodResolver(CreateSnippetSchema),
  });

  const onSubmit = async (data: CreateSnippetFormData) => {
    if (!session) {
      return;
    }

    await createSnippet(data, session.user.accessToken);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton type="button" className="text-sm border-secondary text-secondary " variant="outline">
          <Code2Icon className="w-4 h-4 mr-2" /> New Snippet
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md md:max-w-lg rounded-lg">
        <DialogHeader>
          <DialogTitle>Create Snippet</DialogTitle>
          <DialogDescription>Create a new snippet and share it with others.</DialogDescription>
        </DialogHeader>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <InputField placeholder="Title" name="title" type="text" register={register} error={errors.title} />
          <CustomButton
            type="submit"
            className="bg-secondary text-background font-semibold px-5 rounded-lg font-[family-name:var(--font-geist-sans)]"
          >
            Close
          </CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
