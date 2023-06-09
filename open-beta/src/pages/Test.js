import './site.css';
import Reach, { useState, useRef, useEffect } from 'react';
import { Alert, Container, Row, Col, Card, Button } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import process from 'process';
import React from 'react';

const Test = () => {

  const truncateString = (str) => {
    if (str.length > 100) {
      return str.substring(0, 100) + "...";
    } else {
      return str;
    }
  }
  const SITE_KEY = process.env.REACT_APP_SITE_KEY;

  const initialStateForRecaptchaRef = null;
  const recaptchaRef = useRef(initialStateForRecaptchaRef);
  
  const [wallet, setWallet] = useState('');
  const [space, setSpace] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const initialState = null;
  const [submittedData, setSubmittedData] = useState(initialState);
  const [content, setData] = useState([]);
  useEffect(() => {
    console.log('ready');
    setTimeout(async () => {
      const res = await axios.get("https://server.hearify.ai/getvalues", { crossdomain: true });
      setData(res.data);
    }, 1000);
  }, []);

  const addProduct = async (wallet, space) => {
    try {
      console.log('wallet', wallet)
      console.log('space', space)
      // const res = await axios.post("http://161.35.199.245/sample", {
      //   'TwitterSpacesID': space,
      //   'walletAddress': wallet
      // });
      // return res.data;
      const res = await axios.get("https://server.hearify.ai/sample?TwitterSpacesID=" + space + "&walletAddress=" + wallet);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  const posted = async (e) => {
    let bigHTML = document.querySelector('#bigHTML');
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
      setTimeout(() => {
        window.location.reload(false);
      }, 3500);
      return
    } else {
      setTimeout(() => {
        window.location.reload(false);
      }, 3500);
    }
  }

  return (
    <Container style={{padding: '10%'}}>
      <Row className='justify-content-md-center'>
        <Col lg={6} xs={12} md={6} className="firstForm">
          <div className={`testform ${formSubmitted ? 'form-submitted' : ''}`}>
            <h2 className='mb-3'>HearifyAI Open Beta Testing</h2>
            <form onSubmit={posted}>
              <input onChange={e => setWallet(e.target.value)} type="text" className='mb-3' name="u" placeholder="Wallet Address" required />
              <input onChange={e => setSpace(e.target.value)} type="text" className='mb-3' name="p" placeholder="Twitter Spaces URL" required />
              <br /><br /><br />
              <ReCAPTCHA sitekey={SITE_KEY} ref={recaptchaRef} size="invisible" />
              <button onClick={posted} type="submit" className="btn btn-primary btn-block btn-large mb-3" style={{fontWeight: 'bold', marginTop: '2%'}}>TEST US!</button>
            </form>
          </div>
        </Col>
        <Col lg={6} xs={12} md={6}>
          <div style={{color: 'white'}}>
            <h2 className='mb-3 marginLeft'>How To Test?</h2>
          </div>
          <div style={{color: 'white'}}>
            <ul>
              <li>Enter your BEP-20 compatible wallet address</li>
              <li>Enter a Twitter Spaces URL in the format below:</li>
              <li>https://twitter.com/i/spaces/SPACEID?s=20</li>
              <li>https://twitter.com/i/spaces/SPACEID/peek</li>
              <li>1BdGYyRBQLzGX</li>
              <li>Around 3-4 minutes later your it will appear below.</li>
            </ul>
            <p style={{fontWeight: 'bold'}}>Important: Test won't be successful if you don't put the Twitter Spaces URLs as above.</p>
          </div>
        </Col>
      </Row>
      {(formSubmitted)
      ?
      (wallet.length > 0 && space.length > 0)
      ?
        <Row id="successAlert" style={{display: 'block'}}>
          <Col xs={12}>
            {[
              'success'
            ].map((variant) => (
            <Alert key={variant} variant={variant}>
              Test process is successful. Thank you for your participation.<br />
              <span style={{fontWeight: 'bold'}}>In around 10 minutes your test results will appear below.</span>
            </Alert>
          ))}
          </Col>
        </Row>
        :
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
      :
      <></>
      }
      {/* THIS IS THE DATA */}
      <Row className='mt2'>
        <Col xs={12}>
                {content.slice(0, 10).map((item, index) => {
                  return (
                    <Card border="light" style={{marginBottom: '2%'}}>
      <Card.Header>
        <span style={{fontWeight: 'bold'}}>ID:</span> {item[0]}
      </Card.Header>
      <Card.Body>
      <span style={{fontWeight: 'bold'}}>Title:</span> {truncateString(item[8])} <br /><br />
      <span style={{fontWeight: 'bold'}}>Test Date:</span> {item[3]} <br /><br />
      <span style={{fontWeight: 'bold'}}>Stream Start Date (Timestamp):</span> {item[4]} <br /><br />
      <span style={{fontWeight: 'bold'}}>Stream Create Date (Timestamp):</span> {item[5]} <br /><br />
      <span style={{fontWeight: 'bold'}}>Total Live Listeners:</span> {item[6]} <br /><br />
      <span style={{fontWeight: 'bold'}}>Description:</span> {item[7]} <br /><br />
      <span style={{fontWeight: 'bold'}}>Text:</span> {item[2]} <br /><br />
      <span style={{fontWeight: 'bold'}}>Wallet:</span> {item[10]} <br /><br />
      </Card.Body>
    </Card>
            )
                })
                }
        </Col>
      </Row>
      {/* THIS IS THE DATA */}
    </Container>
  );
}

export default Test;