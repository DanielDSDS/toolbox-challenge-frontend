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

  /**
 * @description Get all available files and their information 
 * @returns {Array} Rreturns all files information 
 */
  const getAllFiles = async () => {
    setErrorMessage('');
    const response = await fetch('http://localhost:5000/files/data')
    if (response.status !== 200) {
      setErrorMessage(`Error code ${response.status}: ${response.statusText}`);
    } else {
      setFiles(await response.json());
    }
  }

  /**
 * @description Get specific file and its information based on file name 
 * @param fileName Name of the file to be searched 
 * @returns {Array} Returns all the information from the specified file 
 */
  const searchForSingleFile = async (fileName = '') => {
    setErrorMessage('');
    //If no name has been specified then the search is invalidated
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
        // If there is an error message, display it 
        errorMessage
          ? <h5 className='text-center text-danger'>{errorMessage}</h5>
          : null
      }

      {
        // As long as there is an error message or the table is empty then it wont show the table
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