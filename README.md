
# MEAN STACK TEMPLATE
### MongoDB, Express, Angular & Node

<br />
Frontend: Angular & Angular Material

Backend: Node & Express

Database: MongoDB & Mongoose

E-Mail Provider: EmailJS 
(200 E-Mails / Month Free)

Website: [https://www.emailjs.com/](https://www.emailjs.com/)

<br />

<b>Tested with version:</b>

- Angular CDK v15.1.0
- Angular Material v15.1.0
- Node v18.13.0
- Express v4.18.2
- MongoDB v6.0.3
- Mongoose v6.8.3
- EmailJS v3.10.0
- JasonWebToken v9.0.0

<br />
Installation

```bash
git clone https://github.com/elyps/mean-stack-template.git
```

Create environments
```bash
touch client/src/environments/environment.ts
touch client/src/environments/environment.prod.ts
```

Example environment.ts
```js
export const environment = {
  production: false,
  apiKey: '<api-key>',
  serviceKey: '<service_id>',
  templateKey: '<template_id>'
};
```

Example environment.prod.ts
```js
export const environment = {
  production: true,
  apiKey: '<api-key>',
  serviceKey: '<service_id>',
  templateKey: '<template_id>'
};
```

FRONTEND
```bash
cd client
npm install
npm start
```

BACKEND
```bash
cd server
npm install
npm start
```

<br />
Now visit <strong>[http://localhost:4200](http://localhost:4200)</strong> and <strong>Voila!</strong> 🎉
