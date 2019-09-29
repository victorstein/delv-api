let Telephone = require('nexmo')

// Request response interface
interface requestResponse {
  request_id: string
  status: number
  error_text: string
}

// Request error interface
interface requestError {
  request_id: string
  status: number
  error_text: string
}

// Initialize nexmo
const nexmo = new Telephone({
  apiKey: 'f6772158',
  apiSecret: '6zJD447GoSlUiKkF',
})

class Nexmo {
  requestPIN (phoneNumber: string): Promise<requestResponse> {
    return new Promise(async (resolve, reject) => {
      // Send message through nexmo for validation
      nexmo.verify.request({
        number: phoneNumber,
        brand: 'DELV',
        code_length: '6',
        sender_id: 'PIN DELV',
        country: 'NI',
        workflow_id: 4,
        next_event_wait: 600
      }, (err: requestError, result: requestResponse) => {
        if (err) { reject(err) }
        if (result.status !== 0) {
          reject(result.error_text)
        }
        resolve(result)
      });
    })
  }
}

export default new Nexmo()