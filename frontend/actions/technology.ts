'use server';

import { Technology } from '@/interfaces/technology';
import { redirect } from 'next/navigation';

// export async function createUser(prevState: any, formData: FormData) {
//   const res = await fetch("https://...");
//   const json = await res.json();

//   if (!res.ok) {
//     return { message: "Please enter a valid email" };
//   }

//   redirect("/dashboard");
// }

export async function getTechs(): Promise<Technology[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/technology`);
  const data = await response.json();
  return data;
}

export async function searchTechs(searchTerm: string): Promise<Technology[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/technology/search?searchTerm=${encodeURIComponent(searchTerm)}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch technologies');
  }
  const data = await response.json();
  console.log(data);

  return data;
}
