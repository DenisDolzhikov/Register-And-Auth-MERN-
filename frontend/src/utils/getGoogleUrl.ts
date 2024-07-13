export const getGoogleUrl = (from: string) => {
  const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootURL}?${qs.toString()}`;
}