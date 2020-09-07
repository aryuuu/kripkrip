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

  const [key, setKey] = useState('');
  const [alphaTable, setAlphaTable] = useState('');
  const [m, setM] = useState('');
  const [b, setB] = useState('');

  const handleSwitch = (e) => {
    console.log(e.target.checked);
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
    console.log(cipher);
    console.log(key);
    console.log(inputText);
    console.log(resultText);
    console.log(m);
    console.log(b);
    console.log(alphaTable);
    console.log(file);
    console.log(filename);



    let body = {};

    switch (cipher) {
      case "full-vigenere":
        body['key'] = key;
        body['alphaTable'] = alphaTable;
        body[`${isEncrypt ? 'plain' : 'cipher'}`] = inputText;
        break;
      case "extended-vigenere":
        if (file) {
          body = new FormData();
          body.append('key', key);
          body.append('alphaTable', alphaTable);
          body.append('file', file);
        } else {
          body['key'] = key;
          body['alphaTable'] = alphaTable;
          body[`${isEncrypt ? 'plain' : 'cipher'}`] = inputText;
        }
        break;
      case "affine":
        body['m'] = m;
        body['b'] = b;
        body[`${isEncrypt ? 'plain' : 'cipher'}`] = inputText;
        break;

      default:
        body['key'] = key;
        body[`${isEncrypt ? 'plain' : 'cipher'}`] = inputText;
        break;
    }

    // request goes here
    try {
      // const res = await axios.post(
      //   `${apiUrl}/${cipher}/${isEncrypt ? 'enc' : 'dec'}`,
      //   body,
      //   {
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }
      //   )
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
            onChange={handleSwitch}/>
          <label 
            className="custom-control-label" 
            htmlFor="encryptSwitch">
              {isEncrypt ? 'Encrypt' : 'Decrypt'}
              {/* {switchLabel} */}
          </label>
        </div>

        {/* cipher dropdown */}
        <div class="dropdown">
          <a class="btn btn-info dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {cipher}
          </a>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" onClick={e => setCipher('vigenere')}>vigenere</a>
            <a class="dropdown-item" onClick={e => setCipher('full-vigenere')}>full-vigenere</a>
            <a class="dropdown-item" onClick={e => setCipher('autokey-vigenere')}>autokey-vigenere</a>
            <a class="dropdown-item" onClick={e => setCipher('extended-vigenere')}>extended-vigenere</a>
            <a class="dropdown-item" onClick={e => setCipher('playfair')}>playfair</a>
            <a class="dropdown-item" onClick={e => setCipher('super-enkripsi')}>super-enkripsi</a>
            <a class="dropdown-item" onClick={e => setCipher('affine')}>affine</a>
            <a class="dropdown-item" onClick={e => setCipher('hill')}>hill</a>
            <a class="dropdown-item" onClick={e => setCipher('enigma')}>enigma</a>
          </div>
        </div>

        {/* key */}
        <h5 className="display-5 text-center mb-2">
          Key
        </h5>
        <Key cipher={cipher} keyHook={setKey} m={setM} b={setB} alphaTable={setAlphaTable}/>
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
              readOnly>
            </textarea>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            {/* file upload */}
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" onChange={handleFile}/>
              <label class="custom-file-label" for="customFile">{filename}</label>
            </div>
            
          </div>
          <div className="col">
            {/* response file */}

          </div>
        </div>
        {/* submit */}
        <button type="submit" className="btn btn-primary mt-5">
          {isEncrypt ? 'Encrypt' : 'Decrypt'}
        </button>
      </form>
    </>
  )

}

export default Krip;