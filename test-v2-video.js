const API_KEY = 'sk_V2_hgu_knlftFQW2CX_t2rYWYiT8Y9EoYxA4OevLLavxIxxqCoi';
const AVATAR_ID = '25eebd0cfd2e43f88c9bcbf73a3a3fef';

async function test() {
  const url = 'https://api.heygen.com/v2/video/generate';
  console.log('Testing', url);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      video_inputs: [{
        character: { type: 'avatar', avatar_id: AVATAR_ID, avatar_style: 'normal' },
        voice: { type: 'text', input_text: 'Hello world', voice_id: '89732a2e3b0942a789588c084f2632a5' }
      }]
    })
  });
  console.log('Response:', await res.text());
}

test();
