import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

export function generateResponse(
  response?: AxiosResponse['data'],
  message = 'success',
  status?: number,
  redirectUrl?: URL,
) {
  // For debugging purposes
  console.log('\x1b[35m[API RESPONSE]\x1b[0m', response?.data, message, status);

  if (typeof response === 'string') {
    return NextResponse.json(
      {
        message: response,
      },
      { status },
    );
  }

  const data = response;
  if (data?.message) {
    delete data.message;
  }

  if (redirectUrl) {
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.json(
    {
      message: response?.message || message,
      data,
    },
    { status },
  );
}

/** for debugging */
export function axiosToCurl(config: AxiosRequestConfig) {
  const { method, baseURL, url, headers, data } = config;
  const wholeUrl = baseURL ? `${baseURL}/${url}` : url;

  // Start building the cURL command
  let curl = `curl -X ${method?.toUpperCase()} '${wholeUrl}'`;

  // Add headers
  if (headers) {
    Object.keys(headers).forEach((key) => {
      curl += ` -H '${key}: ${headers[key]}'`;
    });
  }

  // Add data if present
  if (data) {
    curl += ` -d '${JSON.stringify(data)}'`;
  }

  return curl;
}
