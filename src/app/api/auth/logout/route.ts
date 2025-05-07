import { AxiosError } from 'axios';
import { generateResponse } from '../../utils';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const response = generateResponse(
      undefined,
      'Logout successful',
      200,
      new URL('/login', req.url),
    );

    response.cookies.delete('token');
    response.cookies.delete('userId');

    return response;
  } catch (err) {
    const error = err as AxiosError;
    return generateResponse(
      error?.response?.data,
      'something went wrong',
      error.status,
    );
  }
}
