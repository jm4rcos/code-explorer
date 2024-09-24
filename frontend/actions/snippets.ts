'use server';

import { CreateSnippetFormData } from '@/app/(protected)/snippets/_components/create-snippet-modal';
import {
  UpdateSnippetContent,
  UpdateSnippetFormData,
} from '@/app/hooks/use-update-snippet-form';
import { Snippet } from '@/interfaces/snippet';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getSnippets(
  technologyId?: string,
  page?: number,
  limit?: number,
  searchTerm?: string,
  orderBy?: string,
): Promise<{ data: Snippet[]; total: number }> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/snippets?`;

  const params = new URLSearchParams();
  if (technologyId) params.append('technologyId', technologyId);
  if (page && page > 1) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  if (searchTerm) params.append('search', searchTerm);
  if (orderBy) params.append('orderBy', orderBy);

  url += params.toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export const getSnippetById = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/snippets/${id}`,
  );
  const data = await response.json();
  return data;
};

export async function getUserSnippets(token: string): Promise<Snippet[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/snippets/user`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  return data;
}

export async function createSnippet(
  snippet: CreateSnippetFormData,
  token: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/snippets/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(snippet),
    },
  );

  const data = await response.json();
  console.log(data);

  return redirect(`/snippets/${data.id}`);
}

export async function updateSnippet(
  id: string,
  token: string,
  dto: UpdateSnippetFormData,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/snippets/content/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    },
  );

  const data = await response.json();

  revalidatePath(`/snippets`);

  return data;
}

export async function updateSnippetContent(
  id: string,
  token: string,
  content: UpdateSnippetContent,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/snippets/content/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    },
  );

  const data = await response.json();

  revalidatePath(`/snippets/${id}`);
  return data;
}

export async function deleteSnippet(id: string, token: string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/snippets/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return redirect('/snippets');
}
