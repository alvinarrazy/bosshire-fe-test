import { NextRequest } from 'next/server';
import httpApi from '@/app/api/httpApi';
import { AxiosError, AxiosResponse } from 'axios';
import { generateResponse } from '../../utils';
import { User } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    let userId = req.cookies.get('userId')?.value;
    const body = await req.json();
    let data: AxiosResponse['data'] = {};
    if (!userId) {
      data = (await httpApi().post('auth/login', body)).data;
      // To simulate
      const userData = await getUserDataByUsername(body.username);
      userId = userData.id + '';
    } else {
      data.token = req.cookies.get('token')?.value;
    }

    const res = await httpApi(userId).get(`users/${userId}`);
    data = { ...data, user: res.data };

    const response = generateResponse(data, 'Login successful', 200);

    response.cookies.set({
      name: 'token',
      value: data.token || 'FAKETOKEN',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set({
      name: 'userId',
      value: userId,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

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

/** to simulate get userdata after login due to API limitation */
async function getUserDataByUsername(username: string): Promise<User> {
  const res = await httpApi().get('users');
  const data = res.data.find((user: User) => user.username === username);
  return data;
}
