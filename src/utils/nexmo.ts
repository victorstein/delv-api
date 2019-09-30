let Telephone = require('nexmo')
import 'dotenv/config'

const { NEXMO_API_KEY, NEXMO_API_SECRET } = process.env

// Request response interface
interface requestResponse {
  request_id: string
  status: string
  error_text: string
}

// Request error interface
interface requestError {
  request_id: string
  status: string
  error_text: string
}

// verify interface
interface verifyInterface {
    request_id: string
    event_id: string
    status: string
    price: string
    currency: string
    estimated_price_messages_sent: string,
    error_text: string
}

// Initialize nexmo
const nexmo = new Telephone({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET,
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
        if (err) { reject(err.error_text) }
        if (result.status !== '0') {
          reject(result.error_text)
        }
        resolve(result)
      });
    })
  }

  verifyPin (requestId: string, code: string): Promise<verifyInterface> {
    return new Promise((resolve, reject) => {
      nexmo.verify.check({
        request_id: requestId,
        code: code
      }, (err: requestError, result: verifyInterface) => {
        if (err) { reject(err.error_text) }
        if (result.status !== '0') {
          reject(result.error_text)
        }
        resolve(result)
      });
    })
  }

}

export default new Nexmo()