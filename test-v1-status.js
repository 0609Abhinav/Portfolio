const API_KEY = 'sk_V2_hgu_knlftFQW2CX_t2rYWYiT8Y9EoYxA4OevLLavxIxxqCoi';
const VIDEO_ID = '6f5070dbd17a4bb7b02d0c79bb9c8e42';

async function test() {
  const url = `https://api.heygen.com/v1/video_status.get?video_id=${VIDEO_ID}`;
  console.log('Testing', url);
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' }
  });
  console.log('Response:', await res.text());
}

test();
