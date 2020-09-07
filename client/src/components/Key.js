import React, { useState, useEffect } from 'react';

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
  const [alphabetTable, setAlphabetTable] = useState(alphabet);
  const [mVal, setMVal] = useState(0);
  const [bVal, setBVal] = useState(0);

  const randomizeTable = () => {
    let a = alphabet.split('');
    const n = a.length;

    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    // return a.join('')
    setAlphabetTable(a.join(''));
    alphaTable(a.join(''));
  }

  // useEffect(updateKey, [keyVal]);

  useEffect(() => {
    alphaTable(alphabet);
  }, []);

  useEffect(() => {
    console.log('key just got updated');
    setKey(keyVal);
  }, [keyVal]);

  useEffect(() => {
    console.log('m and or b updated')
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
          onChange={e => setKeyVal(e.target.value)}/>
        <h5 className="display-5 text-center mb-2">
          Alphabet Table
        </h5>
        <div className="row">
          <div className="col">
            <input className="form-control mt-2 mb-3" type="text" value={alphabetTable} />
          </div>
          <div className="col">
            <button type="button" className="btn btn-dark mt-2 mb-3" onClick={randomizeTable}>
              Random
            </button>
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
              onInput={e => setMVal(e.target.value)}/>
          </div>
          <div className="col">
            <h5 className="display-5 text-center mb-2">
              B
            </h5>
            <input className="form-control mt-2 mb-3" 
              type="number"
              value={bVal}
              onInput={e => setBVal(e.target.value)}/>
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
          onChange={e => setKeyVal(e.target.value)}/>
      </>
    );
  }
}

export default Key;