import { NextRequest, NextResponse } from 'next/server';
import httpApi from '@/app/api/httpApi';
import { RestContext } from '@/app/api/rest/[...routes]/types';
import { AxiosError } from 'axios';
import { generateResponse } from '../../utils';

export async function POST(req: NextRequest, { params }: RestContext) {
  try {
    const body = await req.json();
    const { routes } = await params;
    const token = req.cookies.get('token')?.value;

    const res = await httpApi(token).post(routes.join('/'), body);

    return generateResponse(res.data, 'success', 200);
  } catch (err) {
    const error = err as AxiosError;
    if (error.status === 401) {
      const res = NextResponse.redirect(new URL('/login', req.url));
      res.cookies.delete('token');
      return res;
    }

    return generateResponse(
      error?.response?.data,
      'something went wrong',
      error.status,
    );
  }
}

export async function GET(req: NextRequest, { params }: RestContext) {
  try {
    const { routes } = await params;
    const token = req.cookies.get('token')?.value;
    const searchParams = new URLSearchParams();
    req.nextUrl.searchParams.forEach((value, key) => {
      searchParams.append(key, value);
    });

    let url = routes.join('/');
    if (searchParams.size) {
      url += '?' + searchParams.toString();
    }

    const res = await httpApi(token).get(url);
    return generateResponse(res.data, 'success', 200);
  } catch (err) {
    const error = err as AxiosError;
    if (error.status === 401) {
      const res = NextResponse.redirect(new URL('/login', req.url));
      res.cookies.delete('token');
      return res;
    }

    return generateResponse(
      error?.response?.data,
      'something went wrong',
      error.status,
    );
  }
}
