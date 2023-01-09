import * as Server from '@common/server';
import {getPins} from 'estuary-js'


export default async function apiIndex(req, res) {
    await Server.cors(req, res);
    let api_key = req.body.api_key;
  if (req.method == 'GET') {
      const pins = await getPins(api_key);
      res.json({ pins });
    }
  else {
    res.status(404).json({ error: 'Not found' });
  }
}

  