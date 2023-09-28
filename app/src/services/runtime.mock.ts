export class RuntimeMock {
  private interval: NodeJS.Timeout;

  onMessage(fn: (...args: any[]) => void) {
    let counter = 0;
    this.interval = setInterval(() => {
      counter++;
      if (counter < 30) {
        fn({ data: generateActions(1, true)[0], type: 'message' });
      }
    }, 1000);
  }

  removeListener() {
    clearInterval(this.interval);
  }

  async request(message: any) {
    if (message.type === 'request::get-one') {
      const item = generateActions(1, false)[0];

      return {
        data: {
          ...item,
          action: {
            ...item.action,
            ...message.data.action,
          }
        }
      };
    }

    if (message.type === 'request::get-last') {
      return { data: generateActions(1, false)[0] };
    }
  }

  sendMessage(message: any) {
    console.log(message.data);
  }
}

function generateActions(count: number, simple: boolean) {
  return [
    ...Array(count).fill(null).map((_, index) => ({
      action: {
        timestamp: Date.now() + index,
        type: generateRandomString(20),
      },
      ...(simple ? {} : {
        state: {
          string: 'Hello World',
          number: 100500,
          boolean: true,
          array: [
            'Hello World',
            100500,
            true,
            ['Hello World', 100500, true],
            { hello: 'world' },
          ],
          object: {
            string: 'Hello World',
            number: 100500,
            boolean: true,
            array: [
              'Hello World',
              100500,
              true,
              ['Hello World', 100500, true],
              { hello: 'world' },
            ],
            null: null,
          },
          null: null,
          error: new Error('test'),
          emptyObject: {},
        },
      })
    }))
  ];
}

function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
