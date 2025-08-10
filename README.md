# AnandCo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.


```bash
vercel dev or npm run vercelDev
```

for apI running 

## Use Vercel Serverless Function and other optins

When you host your Angular frontend on **Vercel**, the request:

```
https://anand-co.vercel.app/api/send-email
```

is being handled by **Vercel itself**, not your Node.js backend.
Since Vercel doesn't know about your backend running on `localhost:3000`, it responds with **405 Method Not Allowed**.

---

## Why This Happens

In dev, we fixed it with `proxy.conf.json`.
But in production, there’s **no Angular dev server** to proxy to your backend — the frontend and backend must both be deployed somewhere public, and the frontend must call the backend’s public URL.

---

## Your Options

### **Option 1 — Deploy Backend Separately (Recommended for Now)**

1. Host your backend (Node.js) on something like:

   * **Render** (free tier)
   * **Railway**
   * **Heroku**
   * Or even **Vercel serverless functions** (Option 2 below)
2. Let’s say your backend ends up at:

   ```
   https://anand-co-api.onrender.com
   ```
3. In Angular service:

   ```ts
   sendEmail(formData: any) {
     return this.http.post('https://anand-co-api.onrender.com/api/send-email', formData);
   }
   ```
4. No `proxy.conf.json` in production — you call the backend directly.

---

### **Option 2 — Use Vercel Serverless Function**

If you want **frontend and backend both on Vercel**:

* Move your backend API route into `api/send-email.js` in your Angular project root (or `/api` folder if separating).
* Vercel automatically treats `/api/...` as a serverless function.
* Update `nodemailer` code to work in serverless.

Example file structure:

```
/api/send-email.js   <-- your backend email code
/src/...             <-- Angular frontend
```

Then, in Angular, you can keep:

```ts
this.http.post('/api/send-email', formData);
```

and it will run on Vercel.

---

### **Option 3 — Fullstack Deployment (Node + Angular)**

Deploy both Angular & Node on the same server (e.g., AWS, DigitalOcean, Render) so `/api` works naturally without proxy.
This is easiest if you **don’t** want to go serverless.

---

Since you’re already using **Vercel for hosting**,
Option 2 is the most natural — we can convert your `/api/send-email` backend into a **Vercel serverless function** so it works without separate hosting.

---

Do you want me to rewrite your **`server.js`** into a **Vercel-ready `/api/send-email.js` function** so it works directly on your deployed site? That would solve the 405.






this.http.post('/api/send-email', formData);
and it will run on Vercel.

## Additional Resources
https://stackoverflow.com/questions/77868506/swiper-in-angular-17
https://dev.to/chabbasaad/sending-email-using-nodejs-and-nodemailer-with-angular-app-contact-form-5c58

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Generate an App Password
Go to: https://myaccount.google.com/apppasswords

Log in with your Gmail account.

For Select app, choose Mail.

For Select device, choose Other and type something like Nodemailer.

Click Generate.

Copy the 16-character password (it will have spaces, but you use it without spaces).
