'use client';
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { getPins } from '.yalc/estuary-js-browser/dist/index.js';
import styles from '@components/Playground.module.scss';
type AppProps = {
  shake: any;
  validKey: boolean;
  key:string
}; /* use `interface` if exporting so that consumers can extend */

export default function GetPins(props: AppProps) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  let playFunction = async () => {
    if (props.validKey) {
      console.log(props)
      console.log(props.key)
      getPins(props.key)
    }
    else {
      props.shake(true);
      setTimeout(() => {
        props.shake(false);
      }, 500);
    }
  };
  return (
    <React.Fragment>
      <div>
        <button className={styles.button} onClick={() => playFunction()}>GetPins</button>
      </div>
      
      <div className={styles.responseContainer}>
      <div>Response:</div>
        <p>{response}</p>
      </div>
    </React.Fragment>
  );
}
