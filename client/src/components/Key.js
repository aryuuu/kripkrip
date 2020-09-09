import React, { useState, useEffect } from 'react';
import CopyToClipBoard from 'react-copy-to-clipboard';
// hooks

// const [alphabetTable, setAlphabetTable] = useState(alphabet);

const Key = (props) => {
  const {
    cipher,
    setKey,
    alphaTable,
    m,
    b
  } = props;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [keyVal, setKeyVal] = useState('');
  const [alphabetTable, setAlphabetTable] = useState('');
  const [mVal, setMVal] = useState(0);
  const [bVal, setBVal] = useState(0);

  const getRandomAlphabet = () => {
    let a = alphabet.split('');
    const n = a.length;

    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join('');
  }

  const randomizeTable = () => {
    let result = '';
    for (let i = 0; i < 26; i++) {
      if (i > 0) result += ',';
      result += getRandomAlphabet();
    }
    setAlphabetTable(result);
    // alphaTable(result);
  }

  useEffect(() => {
    alphaTable(alphabet);
  }, []);

  useEffect(() => {
    alphaTable(alphabetTable);
  }, [alphabetTable]);

  useEffect(() => {
    setKey(keyVal);
  }, [keyVal]);

  useEffect(() => {
    m(mVal);
    b(bVal);
  }, [mVal, bVal]);

  if (cipher === 'full-vigenere') {
    return (
      <>
        <input className="form-control mt-2 mb-3"
          type="text"
          placeholder="key"
          value={keyVal}
          onChange={e => setKeyVal(e.target.value)} />
        <h5 className="display-5 text-center mb-2">
          Alphabet Table
        </h5>
        <div className="row">
          <div className="col">
            <input className="form-control mt-2 mb-3" type="text" value={alphabetTable} />
          </div>
          <div className="col">
            <button type="button" className="btn btn-dark mt-2 mb-3" onClick={randomizeTable}>
              Randomize
            </button>
            {/* <CopyToClipBoard text={alphabetTable} onCopy={alert("Copied")}>
              <button className="btn ml-3">
                <i class="far fa-copy"></i>
              </button>
            </CopyToClipBoard> */}
          </div>
        </div>
      </>
    );

  } else if (cipher === 'affine') {
    return (
      <>
        <div className="row">
          <div className="col">
            <h5 className="display-5 text-center mb-2">
              M
            </h5>
            <input className="form-control mt-2 mb-3"
              type="number"
              value={mVal}
              onInput={e => setMVal(e.target.value)} />
          </div>
          <div className="col">
            <h5 className="display-5 text-center mb-2">
              B
            </h5>
            <input className="form-control mt-2 mb-3"
              type="number"
              value={bVal}
              onInput={e => setBVal(e.target.value)} />
          </div>
        </div>

      </>
    );
  } else {
    return (
      <>
        <input className="form-control mt-2 mb-3"
          type="text"
          placeholder="key"
          onChange={e => setKeyVal(e.target.value)} />
      </>
    );
  }
}

export default Key;