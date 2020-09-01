# USSD Airtime
USSD demo for buying airtime

## Installation
1. Clone this repo
2. Install npm packages
3. Run ```npm start```

## Testing enpoint
Use an API test client like Postman to send a POST request to ```http://localhost:3000```

Include the following payload in the request body

```
{
  "phoneNumber":"+256781650002",
  "sessionId":"12345678",
  "serviceCode":"6542387",
  "text":""
}
```

You can vary text value in the following ways
1. Home page send an empty string```""```.
2. The first option selected is a number from the landing page options e.g ```"2"```.
3. The following options are separated by * from the first. e.g ```"1*3"```.
4. Values such as names or amounts are entered just as 3 above. e.g ```"1*2*John"``` or ```2*1000```
