const API_KEY = 'sk_V2_hgu_knlftFQW2CX_t2rYWYiT8Y9EoYxA4OevLLavxIxxqCoi';

async function test() {
  const url1 = 'https://api.heygen.com/v1/liveavatar.create_token';
  console.log('Testing', url1);
  const res1 = await fetch(url1, {
    method: 'POST',
    headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' }
  });
  console.log('Response:', await res1.text());
}

test();
