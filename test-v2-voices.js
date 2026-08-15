const API_KEY = 'sk_V2_hgu_knlftFQW2CX_t2rYWYiT8Y9EoYxA4OevLLavxIxxqCoi';

async function test() {
  const url = 'https://api.heygen.com/v2/voices';
  console.log('Testing', url);
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  const maleVoice = data.data?.voices?.find(v => v.gender === 'Male' && v.language === 'English');
  console.log('Found voice:', maleVoice?.voice_id || maleVoice);
}

test();
