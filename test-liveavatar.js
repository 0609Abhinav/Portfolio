const API_KEY = 'sk_V2_hgu_knlftFQW2CX_t2rYWYiT8Y9EoYxA4OevLLavxIxxqCoi';
const AVATAR_ID = '25eebd0cfd2e43f88c9bcbf73a3a3fef';

async function test() {
  const url1 = 'https://api.liveavatar.com/v1/sessions';
  console.log('Testing', url1);
  const res1 = await fetch(url1, {
    method: 'POST',
    headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'FULL', avatar_id: AVATAR_ID })
  });
  console.log('Response:', await res1.text());

  const url2 = 'https://api.heygen.com/v1/sessions';
  console.log('Testing', url2);
  const res2 = await fetch(url2, {
    method: 'POST',
    headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'FULL', avatar_id: AVATAR_ID })
  });
  console.log('Response:', await res2.text());
}

test();
