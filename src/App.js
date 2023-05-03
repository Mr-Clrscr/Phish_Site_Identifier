import React, { useState } from 'react';
import { Container, Row, Col, Form, Modal, Spinner } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import checkURL from './validationService';

function App() {
  const [urlValue, setUrlValue] = useState('');
  const [validationData, setValidationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const setInputValue = (e) => {
    setUrlValue(e.target.value);
  }

  const handleClose = () => setShowModal(false);

  const getValidation = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await checkURL(urlValue);
      setValidationData(response);
      setShowModal(true);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Phishing URL Identifier</h1>
      </header>
      <Container fluid className="main-container">
        <Row md={12} className="align-items-center">
          <Col md={7} className="instructions">
            <h2>Instructions</h2>
            <p>Enter the URL you want to search for in the search box and wait for the results to appear. Keep in mind that we have a limit of 10 hits per day, so be sure to check https://checkphish.ai/ for API limits and endpoints.</p>
          </Col>
          <Col sm={1} style={{ height: '95%', width: '2%' }}>
            <div className="vertical-line"></div>
          </Col>
          <Col md={4} className="search">
            <Form onSubmit={getValidation} style={{ width: '100%' }}>
              <Form.Group>
                <div className="search-box">
                  <Form.Control type="text" placeholder="Enter URL" className="form-control" onChange={(e) => setInputValue(e)} />
                  <button type="submit" className="search-button">Search</button>
                </div>
              </Form.Group>
            </Form>
            {loading && <Spinner animation="border" />}
            {error && <p>An error occurred: {error.message}</p>}
            {validationData && (
              <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{ backgroundColor: "#e91e63", color: "white" }}>
                  <Modal.Title>Results</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ boxShadow: "0px 3px 10px #ccc" }}>
                  <Row>
                    <Col md={6}>
                      <p>URL:</p>
                      <p>Status:</p>
                      <p>WebSite Screenshot:</p>
                    </Col>
                    <Col md={6}>
                      <p>{validationData.url}</p>
                      {validationData.disposition === "clean" ? (
                        <p className="btn btn-primary">{validationData.disposition}</p>
                      ) : (
                        <p className="btn btn-warning">{validationData.disposition}</p>
                      )}
                      <img src={validationData.screenshot_path} alt="Screenshot" style={{ maxWidth: "100%", maxHeight: "400px",border:'1px solid black'}} />
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                </Modal.Footer>
              </Modal>
            )}
          </Col>
        </Row>
      </Container>
      <footer className="footer">
        <p>&copy; 2023 - All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;