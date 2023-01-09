'use client';
import styles from '@components/DefaultLayout.module.scss';
import style from '@components/Playground.module.scss';
import Head from 'next/head';

import * as React from 'react';
import { useState } from 'react';
import Navigation from './Navigation';

import PutFile from '../pages/putFile';
import GetPins from './play/getPins';

export default function App(props) {
  const [key, setKey] = useState('');
  const [validKey, setValidKey] = useState(false);
  const [shakeKey, setShakeKey] = useState(false);

  let checkApiKey = async (key: any) => {
    fetch('https://api.estuary.tech/user/stats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${key}`,
        accept: 'application/json',
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        //add className = styles.valid
        document.getElementById('api-key-input').classList.add(styles.valid);
        document.getElementById('api-key-input').classList.remove(styles.invalid);
        setKey(key);
        setValidKey(true);
      } else {
        setKey('');
        setValidKey(false);
        document.getElementById('api-key-input').classList.remove(styles.valid);
        document.getElementById('api-key-input').classList.add(styles.invalid);
      }
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.left}>
        <Navigation></Navigation>
      </div>
      <div className={styles.right}>
        <div className={shakeKey ? styles.shake : null}>
          <input
            id="api-key-input"
            className={styles.apiInput}
            type="text"
            value={key}
            onSubmit={checkApiKey}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter Api key"
          />
          <button className={style.button} onClick={() => checkApiKey(key)}>
            {' '}
            {validKey ? 'Change Key' : 'Set Key'}
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}
