# VBC Tenchat Frontend developer test assignment
#### Author: Vladislav Pak
## Assignment

### Design
Project's design in Figma [is here](https://www.figma.com/file/ztjP46f3M8byKkVdZgV0MS/Untitled?type=design&node-id=0%3A1&t=iOwDJEHmuojB1eyb-1).

### Conditions
Project must be completed using Nuxt 3 and uploaded to GitHub/GitLab/Bitbucket.

1) Implement pages using Pixel Perfect.
2) Layout - [tailwindcss](https://tailwindcss.com/)
3) The state of the form must be in Pinia
4) Use the [fetch api built into nuxt 3](https://github.com/unjs/ofetch)
5) The LOG IN and SIGN UP buttons must be deactivated until all fields are entered (Validation for email is not necessary)
6) On the Signup page, when the data is entered, attempt to change the route should not be allowed to the login page, we ask the user a question asking that all data may be lost. If he presses ok, the form data is cleared and the transition occurs. If he clicks no, then we remain on the current page.
7) On the OTP page, the previously entered email should be displayed when you click on Change Email, return to the previous page and clear the password and confirm password.
8) When you click on SUBMIT or LOG IN, we send a request to 
```
"https://dummyjson.com/auth/login",
method: 'POST',
Content-Type': 'application/json' 
```
[Dummy JSON Auth API Documentation](https://dummyjson.com/docs/auth)

## Website

This project was published on Netlify. You can check _**live version here:**_ [**vbc-tenchat-test-vlad-pak.netlify.app**](https://vbc-tenchat-test-vlad-pak.netlify.app/).

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
