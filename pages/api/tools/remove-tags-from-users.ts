import type { NextApiRequest, NextApiResponse } from 'next';
import type { ToolExecutionInput } from '@/lib/tools/types';
import { executeRemoveTagsFromUsersServer, validateRemoveTagsInput } from '@/lib/server/removeTagsFromUsersService';

const MAX_REQUEST_BYTES = 2_000_000;

type ErrorBody = {
  message: string;
};

function parseContentLength(value: string | string[] | undefined): number | null {
  if (!value) return null;
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed. Use POST.' } satisfies ErrorBody);
  }

  const requestBytes = parseContentLength(req.headers['content-length']);
  if (requestBytes !== null && requestBytes > MAX_REQUEST_BYTES) {
    return res.status(413).json({
      message: `Payload too large. Maximum request size is ${MAX_REQUEST_BYTES} bytes.`
    } satisfies ErrorBody);
  }

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Invalid JSON payload.' } satisfies ErrorBody);
  }

  const input = req.body as ToolExecutionInput;
  const validation = validateRemoveTagsInput(input);
  if (!validation.ok) {
    return res.status(validation.statusCode).json({ message: validation.message } satisfies ErrorBody);
  }

  try {
    const result = await executeRemoveTagsFromUsersServer(input);
    return res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Remove Tags execution failed.';
    return res.status(500).json({ message } satisfies ErrorBody);
  }
}

