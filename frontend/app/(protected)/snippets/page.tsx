'use client';

import { useTransition } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Code2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { SnippetList } from '@/components/snippet-list';
import { CustomButton } from '@/components/ui/custom-button';

import { createSnippet, getUserSnippets } from '@/actions/snippets';

import { CreateSnippetFormData } from './_components/create-snippet-modal';

const Page = () => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  if (!session) {
    return redirect('/auth/login');
  }

  const handleCreateSnippet = async (data: CreateSnippetFormData) => {
    if (!session) {
      return;
    }

    startTransition(async () => {
      await createSnippet(data, session.user.accessToken);
    });
  };

  const { data: userSnippets, isLoading } = useQuery({
    queryKey: ['user-snippets', session?.user.accessToken],
    queryFn: () => getUserSnippets(session?.user.accessToken as string),
    refetchOnWindowFocus: true,
  });

  return (
    <div className="h-full w-full max-w-full font-[family-name:var(--font-geist-sans)] items-center flex flex-col gap-2  py-10">
      <h1 className="text-3xl mb-4 font-semibold">My Snippets</h1>

      <div className="w-full lg:px-8 px-8 gap-2 flex justify-between">
        <CustomButton
          disabled={isPending}
          type="button"
          className="text-sm border-secondary text-secondary "
          variant="outline"
          onClick={() =>
            handleCreateSnippet({
              title: 'Untitled',
            })
          }
        >
          <Code2Icon className="w-4 h-4 mr-2" /> New Snippet
        </CustomButton>
      </div>

      <SnippetList data={userSnippets || []} isLoading={isLoading} />
    </div>
  );
};

export default Page;
