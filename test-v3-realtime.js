const API_KEY = 'sk_V2_hgu_knlftFQW2CX_t2rYWYiT8Y9EoYxA4OevLLavxIxxqCoi';
const AVATAR_ID = '25eebd0cfd2e43f88c9bcbf73a3a3fef';

async function test() {
  const url = 'https://api.heygen.com/v3/avatar-realtime';
  console.log('Testing', url);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'tts',
      avatar_id: AVATAR_ID,
      voice_id: '89732a2e3b0942a789588c084f2632a5',
      text: 'Hello, this is a test of the avatar realtime streaming endpoint.'
    })
  });
  console.log('Response:', await res.text());
}

test();
