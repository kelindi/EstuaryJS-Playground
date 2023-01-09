'use client';
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { putFile } from '.yalc/estuary-js-browser/dist/index.js';
import styles from '@components/Playground.module.scss';
type AppProps = {
  shake: any;
  validKey: boolean;
  key:string
}; /* use `interface` if exporting so that consumers can extend */

export default function PutFile(props: AppProps) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  let uploadFile = async (file: FileList) => {
    if (props.validKey) {
      putFile(file[0],props.key )
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
        <input className={styles.fileInput} type="file" onChange={(e) => setSelectedFile(e.target.files)} />
        <button className={styles.button} onClick={() => uploadFile(selectedFile)}>Upload</button>
      </div>
      
      <div className={styles.responseContainer}>
      <div>Response:</div>
        <p>{response}</p>
      </div>
    </React.Fragment>
  );
}
