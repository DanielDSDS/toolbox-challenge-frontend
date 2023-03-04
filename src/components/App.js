import React, { Component, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const App = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/files/data', { mode: 'cors' })
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        setFiles(res);
      })
  }, [])

  return (
    <div className='mx-5 mt-4' >
      <h2 className='font-weight-medium mb-4 text-center'>
        Toolbox API App
      </h2>
      <Form className="mb-2 d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <Table variant='dark' striped bordered hover >
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {
            files.length ?
              files.map((singleFile) => {
                return singleFile.lines.map((line, k) =>
                  <tr key={k}>
                    <td>{singleFile.file}</td>
                    <td>{line.text}</td>
                    <td>{line.number}</td>
                    <td>{line.hex}</td>
                  </tr>
                )
              })
              : null
          }
        </tbody>
      </Table>
    </div>
  )
}

export default App;