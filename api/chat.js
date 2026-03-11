'use strict';

const Anthropic = require('@anthropic-ai/sdk');

const SYSTEM_PROMPT = `אתה "נובו" — העוזר החכם של Investor Academy, קורס ההשקעות של NewGen Finance.
אתה עונה בעברית בלבד, בצורה ידידותית, ברורה וקצרה (עד 3 פסקאות).
אתה מומחה ב: השקעות ערך, ETF, ניתוח חברות, ניהול תיק השקעות, שוק ההון הישראלי והאמריקאי.
אתה מכיר את תוכן הקורס: יסודות השקעות ערך, אסטרטגיה, כלי ניתוח, וניהול תיק.
אם שואלים אותך משהו שלא קשור להשקעות ופיננסים — הפנה בנימוס לנושאי הקורס.
אל תיתן ייעוץ השקעות אישי — תמיד הזכר שההחלטות הן של המשתמש.`;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing message' });
  }

  const client = new Anthropic();

  const messages = [];

  if (Array.isArray(history)) {
    for (const entry of history) {
      if (entry.role === 'user' || entry.role === 'assistant') {
        messages.push({ role: entry.role, content: String(entry.content) });
      }
    }
  }

  messages.push({ role: 'user', content: message });

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0]?.text || '';
    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
