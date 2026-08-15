import json

with open(r'C:\Users\HP\.gemini\antigravity\brain\c7ff9091-5043-4844-bd47-084443636ef0\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if '"type":"USER_INPUT"' in line and 'Master Prompt' in line:
            data = json.loads(line)
            with open('prompt.txt', 'w', encoding='utf-8') as out:
                out.write(data['content'])
            break
