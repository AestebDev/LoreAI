import { Router } from 'express';
import { runAssistant } from '../services/assistant';

const router = Router();

// Query AI assistant
router.post('/query', async (req, res) => {
  try {
    const { question, workspace_id } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const response = await runAssistant(question, workspace_id);
    res.json({ 
      answer: response.answer,
      sources: response.sources,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('AI query error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;