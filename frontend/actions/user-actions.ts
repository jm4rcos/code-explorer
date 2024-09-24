import { RegisterSchema } from '@/app/schemas/register-schema';
import { RegisterDTO } from '@/types/user';

export async function signUp(dto: RegisterDTO) {
  try {
    const validatedFields = RegisterSchema.parse(dto);

    if (!validatedFields) {
      throw new Error('Validation failed');
    }

    const { email, password, username } = validatedFields;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during registration');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
