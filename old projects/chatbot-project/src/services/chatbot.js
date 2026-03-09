function chooseRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate() {
  return new Date().toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function solveBasicMath(inputText) {
  const normalized = inputText
    .toLowerCase()
    .replaceAll('x', '*')
    .replaceAll('÷', '/')
    .replaceAll('plus', '+')
    .replaceAll('minus', '-')
    .replaceAll('times', '*')
    .replaceAll('multiplied by', '*')
    .replaceAll('divided by', '/');

  const expression = normalized.match(/-?\d+(\.\d+)?(\s*[-+*/]\s*-?\d+(\.\d+)?)+/);
  if (!expression) return null;

  const safeExpression = expression[0];
  if (!/^[\d+\-*/.\s]+$/.test(safeExpression)) return null;

  try {
    const result = Function(`"use strict"; return (${safeExpression});`)();
    if (typeof result !== 'number' || !Number.isFinite(result)) return null;
    return `The answer is ${result}.`;
  } catch {
    return null;
  }
}

export function getBotResponse(userText, chatHistory = []) {
  const input = userText.trim();
  const lower = input.toLowerCase();

  const mathAnswer = solveBasicMath(input);
  if (mathAnswer) return mathAnswer;

  if (/\b(hello|hi|hey|yo)\b/.test(lower)) {
    return chooseRandom([
      'Hey! What can I help you with?',
      'Hi there. Ask me anything.',
      'Hello! Want help with coding, writing, or quick facts?'
    ]);
  }

  if (/\bhow are you\b/.test(lower)) {
    return 'Running smoothly. What should we work on next?';
  }

  if (/\b(your name|who are you)\b/.test(lower)) {
    return 'I am your assistant bot. I can help with coding, explanations, and quick tasks.';
  }

  if (/\b(time|current time)\b/.test(lower)) {
    return `It is currently ${formatTime()}.`;
  }

  if (/\b(date|today)\b/.test(lower)) {
    return `Today is ${formatDate()}.`;
  }

  if (/\b(weather|temperature|rain)\b/.test(lower)) {
    return 'I cannot fetch live weather yet, but I can add weather API support if you want.';
  }

  if (/\b(thank you|thanks)\b/.test(lower)) {
    return 'You are welcome.';
  }

  if (/\b(bye|goodbye|see you)\b/.test(lower)) {
    return 'See you soon.';
  }

  if (/\b(joke)\b/.test(lower)) {
    return chooseRandom([
      'Why do programmers confuse Halloween and Christmas? Because OCT 31 == DEC 25.',
      'I told my code to behave. It still had too many issues.',
      'Debugging: removing the needles from the haystack while creating a new haystack.'
    ]);
  }

  if (/\b(help|what can you do)\b/.test(lower)) {
    return 'I can chat, solve simple math, answer common questions, and help with coding tasks.';
  }

  const previousUserCount = chatHistory.filter((msg) => msg.sender === 'user').length;
  if (previousUserCount <= 1) {
    return 'Nice to meet you. Tell me what you want to build or solve.';
  }

  return chooseRandom([
    'Can you share a bit more detail so I can give a better answer?',
    'I can help best when you give specific context. What exactly do you need?',
    'Tell me your goal, and I will suggest the fastest way to do it.'
  ]);
}
