import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


const App = () => {
  const [files, setFiles] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllFiles()
  }, [])

  const getAllFiles = async () => {
    setErrorMessage('');
    const response = await fetch('http://localhost:5000/files/data')
    if (response.status !== 200) {
      setErrorMessage(`Error code ${response.status}: ${response.statusText}`);
    } else {
      setFiles(await response.json());
    }
  }

  const searchForSingleFile = async (fileName = '') => {
    setErrorMessage('');
    if (fileName.length) {
      const response = await fetch(`http://localhost:5000/files/data?fileName=${fileName}`)
      if (response.status !== 200) {
        setErrorMessage(`Error code ${response.status}: ${response.statusText}`);
      } else {
        setFiles([await response.json()]);
      }
    } else {
      setErrorMessage(`You must enter a valid file name in order to search`);
    }
  }

  return (
    <div className='mx-5 mt-4' >
      <h2 className='font-weight-medium mb-4 text-center'>
        Toolbox API App
      </h2>
      <div className="mb-2 d-flex">
        <Form.Control
          onSubmit={(e) => e.preventDefault()}
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          variant="outline-success"
          onClick={() => searchForSingleFile(searchValue)}
        >Search
        </Button>
      </div>
      {
        errorMessage
          ? <h5 className='text-center text-danger'>{errorMessage}</h5>
          : null
      }
      {
        files.length && !errorMessage
          ? <Table variant='dark' striped bordered hover >
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
              }
            </tbody>
          </Table>
          : null
      }
    </div>
  )
}

export default App;