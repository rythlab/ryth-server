export const handleResponse = (func: {
  (req: {
    fileName: any
    fileDir: any
    file: { destination: any }
    fileNameNoExtension: any
    headers: any
  }): Promise<{ statusCode: number }>
  (arg0: any, arg1: any, arg2: any): any
}) => {
  return async function (req: any, res: any, next: (arg0?: any) => void) {
    try {
      const resp = await func(req, res, next)
      // if (!isValidResponse(resp)) {
      //   throw new Error('Invalid response returned by function')
      // }
      sendResponse(req, res, resp)
      next()
    } catch (error) {
      console.error('HandleResponse', error)
      next(error)
    }
  }
}

export const successResponse = (obj = {}) => {
  const toSignData = {
    data: {
      ...obj
    }
  }
  return {
    statusCode: 200,
    object: {
      ...toSignData
    }
  }
}

export const handleResponseWithHeartbeat = (
  func: (arg0: any, arg1: any, arg2: any) => any
) => {
  return async function (
    req: any,
    res: {
      set: (arg0: string, arg1: string) => void
      write: (arg0: string) => void
      finished: any
    },
    next: () => void
  ) {
    try {
      // First declare our content type since we will be sending heartbeats back
      // in JSON
      res.set('Content-Type', 'application/json; charset=utf-8')

      // set custom CORS headers that's required if you want to response
      // headers through axios
      res.set('Access-Control-Expose-Headers', 'CN-Request-ID')

      // Write a key for the heartbeat
      res.write('{"_h":"')

      // Fire up an interval that will append a single char to the res
      const heartbeatInterval = setInterval(() => {
        if (!res.finished) {
          res.write('1')
        }
      }, 5000)

      // Await the work of the endpoint
      const resp = await func(req, res, next)

      clearInterval(heartbeatInterval)

      sendResponseWithHeartbeatTerminator(req, res, resp)
      next()
    } catch (error) {
      // sendResponseWithHeartbeatTerminator(req, res, errorResponse(500, error));
    }
  }
}

const sendResponseWithHeartbeatTerminator = (
  req: {
    startTime: [number, number]
    logger: { child: (arg0: { statusCode: any; duration: number }) => any }
  },
  res: any,
  resp: { statusCode: number; object: any }
) => {
  const endTime = process.hrtime(req.startTime)
  const duration = Math.round(endTime[0] * 1e3 + endTime[1] * 1e-6)
  const logger = req.logger.child({
    statusCode: resp.statusCode,
    duration
  })
  if (resp.statusCode === 200) {
    // if (requestNotExcludedFromLogging(req.originalUrl)) {
    //   console.log('Success');
    // }
    console.log('Success')
  } else {
    // logger = logger.child({
    //   errorMessage: resp.object.error
    // });
    // if (req && req.body) {
    //   logger.info(
    //     'Error processing request:',
    //     resp.object.error,
    //     '|| Request Body:',
    //     req.body
    //   );
    // } else {
    //   logger.info('Error processing request:', resp.object.error);
    // }
    // // Converts the error object into an object that JSON.stringify can parse
    // if (resp.object.error) {
    //   resp.object.error = Object.getOwnPropertyNames(
    //     resp.object.error
    //   ).reduce((acc, cur) => {
    //     acc[cur] = resp.object.error[cur];
    //     return acc;
    //   }, {});
    // }
  }

  // Construct the remainder of the JSON response
  let response = '",'
  // Replace the first '{' since we already have that
  response += JSON.stringify(resp.object).replace('{', '')

  // Terminate the response
  res.end(response)
}

const isValidResponse = (resp: { statusCode: any; object: any }) => {
  if (!resp || !resp.statusCode || !resp.object) {
    return false
  }

  return true
}

const sendResponse = (
  req: {
    startTime: [number, number]
    body: any
    query: any
  },
  res: {
    set: (arg0: string, arg1: string) => void
    status: (arg0: any) => {
      (): any
      new (): any
      send: { (arg0: any): void; new (): any }
    }
  },
  resp: { statusCode: number; object: { error: any } }
) => {
  const endTime = process.hrtime(req.startTime)
  const duration = Math.round(endTime[0] * 1e3 + endTime[1] * 1e-6)
  if (resp.statusCode === 200) {
    console.log('Success')
  } else {
    console.log({
      errorMessage: resp.object.error
    })
    if (req && req.body) {
      console.log(
        'Error processing request:',
        resp.object.error,
        '|| Request Body:',
        req.body,
        '|| Request Query Params:',
        req.query
      )
    } else {
      console.log('Error processing request:', resp.object.error)
    }
  }

  // set custom CORS headers that's required if you want to response
  // headers through axios
  res.set('Access-Control-Expose-Headers', 'CN-Request-ID')

  res.status(resp.statusCode).send(resp.object)
}
