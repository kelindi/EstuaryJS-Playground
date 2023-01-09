import * as Server from '@common/server';
import {getKeys, createKey, deleteKey} from 'estuary-js'


export default async function apiIndex(req, res) {
    await Server.cors(req, res);
    let api_key = req.body.api_key;
  if (req.method == 'GET') {
    const keys = await getKeys(api_key);
    res.json({ keys });
  }
    else if (req.method == 'POST') {
      const key = await createKey(req.body.expiry, api_key);
      res.json({ key });
  }
  else if (req.method == 'DELETE') {
    const key = await deleteKey(req.body.key, api_key);
    res.json({ key });
  }
}

  