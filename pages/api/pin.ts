import * as Server from '@common/server';
import {getPin, addPin, deletePin} from 'estuary-js'


export default async function apiIndex(req, res) {
    await Server.cors(req, res);
    let api_key = req.body.api_key;
  if (req.method == 'GET') {
    const pin = await getPin(req.body.cid,api_key);
    res.json({ pin });
  } else if (req.method == 'POST') {
    const pin = await addPin(req.body.cid, undefined, api_key);
    res.json({ pin });
  }
  else if (req.method == 'DELETE') {
    const pin = await deletePin(req.body.cid, api_key);
    res.json({ pin });
  }
  else {
    res.status(404).json({ error: 'Not found' });
  }
}

  