import './site.css';
import { useState } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import $ from 'jquery';

const Test = () => {

  const [wallet, setWallet] = useState('');
  const [space, setSpace] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const posted = (e) => {
    e.preventDefault();

    console.log('wallet', wallet);
    console.log('space', space);
    setFormSubmitted(true);
    setSubmittedData({ wallet, space });

    setTimeout(() => {
      $('#freeAlert').attr('style', 'display: none;')
    }, 10000);

  }



  return (
    <Container style={{padding: '10%'}}>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6} className="firstForm">
          <div className={`testform ${formSubmitted ? 'form-submitted' : ''}`}>
            <h1 className='mb-3'>HearifyAI Open Beta Testing</h1>
            <form onSubmit={posted}>
              <input onChange={e => setWallet(e.target.value)} type="text" className='mb-3' name="u" placeholder="Wallet Address" required="required" />
              <input onChange={e => setSpace(e.target.value)} type="text" className='mb-3' name="p" placeholder="Twitter Spaces ID" required="required" />
              <button onClick={posted} type="submit" className="btn btn-primary btn-block btn-large mb-3">TEST</button>
            </form>
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
            This is a {variant} alert—check it out!
          </Alert>
        ))}
          </Col>
          </Row></>
      :
      <></>
      }
    </Container>
  );
}

export default Test;
