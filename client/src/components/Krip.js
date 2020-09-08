import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Key from './Key';

const Krip = () => {
  const apiUrl = 'http://localhost:3001/api/v1'

  const [isEncrypt, setIsEncrypt] = useState(true);
  const [cipher, setCipher] = useState('vigenere');
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose file');

  const [keyVal, setKeyVal] = useState('');
  const [alphaTable, setAlphaTable] = useState('');
  const [m, setM] = useState('');
  const [b, setB] = useState('');

  const handleSwitch = (e) => {
    setIsEncrypt(e.target.checked);
  }

  const handleInput = (e) => {
    setInputText(e.target.value);
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    // console.log(cipher);
    // console.log(keyVal);
    // console.log(inputText);
    // console.log(m);
    // console.log(b);
    // console.log(alphaTable);
    console.log(file);
    console.log(filename);

    let body = {};
    let formData = new FormData();
    // formData.append('test', '1');
    // console.log("formdata:")
    // console.log(JSON.stringify(formData));
    // console.log(formData);

    switch (cipher) {
      case "full-vigenere":
        body['key'] = keyVal;
        body['alphaTable'] = alphaTable;
        body[`${isEncrypt ? 'plain' : 'cipher'}`] = inputText;
        break;
      case "extended-vigenere":
        if (file) {
          formData.append('key', keyVal);
          formData.append('file', file);
        } else {
          body['key'] = keyVal;
          body[`${isEncrypt ? 'plain' : 'cipher'}`] = inputText;
        }
        break;
      case "affine":
        body['m'] = m;
        body['b'] = b;
        body[`${isEncrypt ? 'plain' : 'cipher'}`] = inputText;
        break;

      default:
        body['key'] = keyVal;
        body[`${isEncrypt ? 'plain' : 'cipher'}`] = inputText;
        break;
    }

    if (cipher === 'extended-vigenere' && file) {
      // console.log('about to upload a file');
      body = formData;
      // for (var key of body.entries()) {
      //   console.log(key[0] + ', ' + key[1]);
      // }
    }

    // console.log(`body ${JSON.stringify(body)}`);
    // for (var key of body.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }

    // request goes here
    let url = `${apiUrl}/${cipher}`;
    if (cipher === 'extended-vigenere' && file) {
      url += '/file';
    }
    url += `/${isEncrypt ? 'enc' : 'dec'}`;

    try {
      const res = await axios.post(
        url,
        body,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': cipher === 'extended-vigenere' && file ? 'multipart/form-data' : 'application/json'  
          }
        }
      )
      setResultText(res.data && res.data.message ? res.data.message : '');
    } catch (err) {

    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* switch */}
        <div className="custom-control custom-switch mb-3">
          <input type="checkbox"
            defaultChecked={true}
            className="custom-control-input"
            id="encryptSwitch"
            onChange={handleSwitch} />
          <label
            className="custom-control-label"
            htmlFor="encryptSwitch">
            {isEncrypt ? 'Encrypt' : 'Decrypt'}
          </label>
        </div>

        {/* cipher dropdown */}
        <div class="dropdown">
          <button class="btn btn-info dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {cipher}
          </button>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <button class="dropdown-item" type="button" onClick={e => setCipher('vigenere')}>vigenere</button>
            <button class="dropdown-item" type="button" onClick={e => setCipher('full-vigenere')}>full-vigenere</button>
            <button class="dropdown-item" type="button" onClick={e => setCipher('auto-key-vigenere')}>auto-key-vigenere</button>
            <button class="dropdown-item" type="button" onClick={e => setCipher('extended-vigenere')}>extended-vigenere</button>
            <button class="dropdown-item" type="button" onClick={e => setCipher('playfair')}>playfair</button>
            <button class="dropdown-item" type="button" onClick={e => setCipher('super-enkripsi')}>super-enkripsi</button>
            <button class="dropdown-item" type="button" onClick={e => setCipher('affine')}>affine</button>
            <button class="dropdown-item" type="button" onClick={e => setCipher('hill')}>hill</button>
            <button class="dropdown-item" type="button" onClick={e => setCipher('enigma')}>enigma</button>
          </div>
        </div>

        {/* key */}
        <h5 className="display-5 text-center mb-2">
          Key
        </h5>
        <Key cipher={cipher} setKey={setKeyVal} m={setM} b={setB} alphaTable={setAlphaTable} />
        {/* <input className="form-control mt-2 mb-3" type="text"/> */}

        <div className="row mb-5">
          <div className="col">
            {/* input */}
            <h5 className="display-5 text-center mb-2">
              Input
            </h5>
            <textarea
              value={inputText}
              onChange={handleInput}
              className="form-control"
              placeholder="Enter your plaintext or ciphertext here...">

            </textarea>
          </div>
          <div className="col">
            {/* output */}
            <h5 className="display-5 text-center mb-2">
              Result
            </h5>
            <textarea
              className="form-control"
              placeholder="Result goes here..."
              value={resultText}
              readOnly>
            </textarea>
          </div>
        </div>

        {
          cipher === 'extended-vigenere'
            ? (
              <div className="row mt-2" >
                <div className="col">
                  {/* file upload */}
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile" onChange={handleFile} />
                    <label class="custom-file-label" for="customFile">{filename}</label>
                  </div>

                </div>
                <div className="col">
                  <button type="button" className="btn btn-warning" onClick={e => { setFile(''); setFilename('Choose file') }}>Clear</button>
                </div>
              </div>
            )
            : null
        }
        {/* submit */}
        <button type="submit" className="btn btn-primary mt-5">
          {isEncrypt ? 'Encrypt' : 'Decrypt'}
        </button>
      </form>
    </>
  )

}

export default Krip;