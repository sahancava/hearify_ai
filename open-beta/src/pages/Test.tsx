import './site.css';
import Reach, { useState, useRef, useEffect } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import process from 'process';
import React from 'react';

const Test = () => {
  const SITE_KEY = process.env.REACT_APP_SITE_KEY;

  const initialStateForRecaptchaRef: any = null;
  const recaptchaRef = useRef(initialStateForRecaptchaRef);
  
  const [wallet, setWallet] = useState('');
  const [space, setSpace] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const initialState: any = null;
  const [submittedData, setSubmittedData] = useState(initialState);
  const [content, setData] = useState([]);

  useEffect(() => {
    console.log('ready');
    setTimeout(async () => {
      const res = await axios.get("http://161.35.199.245/getvalues");
      setData(res.data);
      console.log(content);
    }, 1000);
  }, []);

  const addProduct = async (/** @type {any} */ wallet: string, /** @type {any} */ space: string) => {
    try {
      console.log('wallet', wallet)
      console.log('space', space)
      // const res = await axios.post("http://161.35.199.245/sample", {
      //   'TwitterSpacesID': space,
      //   'walletAddress': wallet
      // });
      // return res.data;
      const res = await axios.get("http://161.35.199.245/sample?TwitterSpacesID=" + space + "&walletAddress=" + wallet);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  const posted = async (e: React.FormEvent<HTMLFormElement>) => {
    let bigHTML = document.querySelector('#bigHTML') as HTMLElement;
    e.preventDefault();
    const captchaToken = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    bigHTML.style.pointerEvents = 'none';
    setFormSubmitted(true);
    setSubmittedData({ wallet, space });

    if (wallet.length > 0 && space.length > 0) {
      bigHTML.style.pointerEvents = 'auto';
      const res = await addProduct(wallet, space);
      console.log(res);
      return
    } else {
      setTimeout(() => {
        window.location.reload(false);
      }, 3000);
    }
  }

  return (
    <Container style={{padding: '10%'}}>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6} className="firstForm">
          <div className={`testform ${formSubmitted ? 'form-submitted' : ''}`}>
            <h1 className='mb-3'>HearifyAI Open Beta Testing</h1>
            <form onSubmit={posted}>
              <input onChange={e => setWallet(e.target.value)} type="text" className='mb-3' name="u" placeholder="Wallet Address" required />
              <input onChange={e => setSpace(e.target.value)} type="text" className='mb-3' name="p" placeholder="Twitter Spaces URL" required />
              <ReCAPTCHA sitekey={SITE_KEY} ref={recaptchaRef} size="invisible" />
              <button onClick={posted} type="submit" className="btn btn-primary btn-block btn-large mb-3">TEST</button>
            </form>
          </div>
        </Col>
      </Row>
        <Row className='mt2'>
          <Col xs={12}>
            <div className="submitted-data-container">
              <div className="submitted-data-grid">
                <div>
      {content.map(item => (
        <li key={item}>
          item: {item[1]}
        </li>
      ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      {(formSubmitted)
      ?
      (wallet.length > 0 && space.length > 0)
      ?
        <Row className='mt2'>
          <Col xs={12}>
            <div className="submitted-data-container">
              <div className="submitted-data-grid">
                <div>
                  <p>Submitted wallet address:</p>
                  <p>{submittedData.wallet}</p>
                </div>
                <div>
                  <p>Submitted Twitter Spaces ID:</p>
                  <p>{submittedData.space}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        :
        <>
          <Row id="freeAlert" style={{display: 'block'}}>
            <Col xs={12}>
              {[
                'danger'
              ].map((variant) => (
              <Alert key={variant} variant={variant}>
                Either wallet address or Twitter Spaces ID is missing. Please try again.
              </Alert>
            ))}
            </Col>
          </Row>
        </>
      :
      <></>
      }
    </Container>
  );
}

export default Test;
