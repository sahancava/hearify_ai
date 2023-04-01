import './site.css';
import { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

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
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className={`testform ${formSubmitted ? 'form-submitted' : ''}`}>
            <h1>HearifyAI Open Beta Testing</h1>
            <form onSubmit={posted}>
              <input onChange={e => setWallet(e.target.value)} type="text" name="u" placeholder="Wallet Address" required="required" />
              <input onChange={e => setSpace(e.target.value)} type="text" name="p" placeholder="Twitter Spaces ID" required="required" />
              <button onClick={posted} type="submit" className="btn btn-primary btn-block btn-large">TEST</button>
            </form>
            {formSubmitted &&
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
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Test;
