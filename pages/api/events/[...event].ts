import type { NextApiRequest, NextApiResponse } from 'next';
import { updateGameState, setCurrentQuestion, selectOption, revealAnswer, resetGame } from '../events';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const eventType = req.query.event?.[0];

  try {
    switch (eventType) {
      case 'update':
        updateGameState(req.body.data);
        break;
      case 'question':
        setCurrentQuestion(req.body.data);
        break;
      case 'option':
        selectOption(req.body.data);
        break;
      case 'reveal':
        revealAnswer();
        break;
      case 'reset':
        resetGame();
        break;
      default:
        return res.status(400).json({ error: 'Invalid event type' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}