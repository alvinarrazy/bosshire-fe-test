import { NextRequest } from 'next/server';
import httpApi from '@/app/api/httpApi';
import { AxiosError } from 'axios';
import { generateResponse } from '../../utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await httpApi().post('users', body);

    return generateResponse(res.data, 'Register successful', 200);
  } catch (err) {
    const error = err as AxiosError;
    return generateResponse(
      error?.response?.data,
      'something went wrong',
      error.status,
    );
  }
}
