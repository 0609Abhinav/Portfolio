const API_KEY = 'sk_V2_hgu_knlftFQW2CX_t2rYWYiT8Y9EoYxA4OevLLavxIxxqCoi';
const AVATAR_ID = '25eebd0cfd2e43f88c9bcbf73a3a3fef';

async function test() {
  const res = await fetch('https://api.heygen.com/v1/streaming.create_token', {
    method: 'POST',
    headers: { 'x-api-key': API_KEY }
  });
  console.log('Token response:', await res.text());

  const res2 = await fetch('https://api.heygen.com/v3/avatar-realtime', {
    method: 'POST',
    headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'text_stream',
      avatar_id: AVATAR_ID,
      voice_id: '1e33abcb4bdc416e919ef7c53dcc29f0'
    })
  });
  console.log('v3 response:', await res2.text());
}

test();
