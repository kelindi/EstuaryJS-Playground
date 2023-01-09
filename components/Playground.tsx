import * as React from 'react';
import { useState } from 'react';
import styles from '@components/Playground.module.scss';
import { getPins, getPin, addPin, deletePin, getKeys, createKey, deleteKey, addFile } from 'estuary-js';
function Playground() {
  const [apiKey, setApiKey] = useState('');


  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div>
          
        </div>
      </section>
      <section className={styles.section}>
        <h1>Pins</h1>
        <h2>Estuary.getPins(apiKey?: string)</h2>
        <button onClick={()=>getPins(apiKey)}>Submit</button>
      </section>
    </div>
  );
}

export default Playground;
