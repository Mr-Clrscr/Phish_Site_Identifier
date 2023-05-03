
# Phishing Site Identifier
A mini project aimed at identifying phishing URLs using the checkphish API endpoints created using react js


## API Reference

#### Initiate url scan

```http
  POST api/neo/scan
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `apiKey` | `string` | **Required**. Your API key |
| `url` | `string` | **Required**. e.g. www.example.com |

#### Get url scan status

```http
  POST api/neo/scan/status
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `apiKey` | `string` | **Required**. Your API key |
| `jobID` | `string` | **Required**. job id for the initiated job |

#### checkURL(url)
Takes url and invokes the above api calls


## Acknowledgements

 - [CheckPhish AI Docs](https://checkphish.ai/docs/checkphish-api/)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_KEY`


## Installation

```bash
  cd project-folder
  npm install
```
