# `Smartphone Management Dashboard Client`
## Smartphone Management Dashboard  Server side live link: 
---
[https://l2b2-full-stack-a5-server-side-upoma218.vercel.app](https://l2b2-full-stack-a5-server-side-upoma218.vercel.app)

## Smartphone Management Dashboard  Server side repo link: 
---
[https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-backend-Upoma218](https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-backend-Upoma218)

## Smartphone Management Dashboard Client side Live link: 
---
[https://imaginative-profiterole-69375f.netlify.app](https://imaginative-profiterole-69375f.netlify.app)

## Smartphone Management Dashboard Client side Live link: 
---
[https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-fronten-Upoma218](https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-fronten-Upoma218)

## Smartphone Management Dashboard Client video link:: 
---
[https://drive.google.com/file/d/1mWV0v-U0EpTy4kYyxT74jd-ObSTOme4y](https://drive.google.com/file/d/1mWV0v-U0EpTy4kYyxT74jd-ObSTOme4y)


## Smartphone Management Dashboard postman documentation Live link: 
---
[https://documenter.getpostman.com/view/27550582/2s9YysE2rH](https://documenter.getpostman.com/view/27550582/2s9YysE2rH)


## All Creadintials for user login: 

### Super Admin: 

```
userId: superAdmin1
password: @superAdmin1

```

### Manager: 

```
userId: manager1
password: #Manager1

```

### Seller: 

```
userId: seller2
password: #Seller2

```

## Primary Project Setup Guideline

### ___Technologies___
---

* Vite
* React redux
* Redux Toolkit
* Tailwind CSS
* ant design
* GitHub
* React Router Dom
* Typescript
* Netlify

---


## **_`Instructions about how to run the application locally`_**

---

- First, create a folder on your computer

- Open the folder with VSC

- we need to install all necessary software, node, gitbush, postman, etc.

## ___`Run these commands given bellow :`___

```
npm create vite smartphone-management-dashboard

cd Smartphone-Management-Dashboard

npm install

npm run dev

echo "# your github repo name here" >> README.md

git init

git add .

git commit -m "first commit"

git branch -M main

git remote add origin `your repo link here`

git push -u origin main

npm i react-router-dom

npm install @reduxjs/toolkit react-redux

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

npm i -D @types/node

npx shadcn-ui@latest init

```

### Folow the instructions for shadcn initialization : 

``` JavaScript
Need to install the following packages:
shadcn-ui@0.8.0
Ok to proceed? (y) y
√ Would you like to use TypeScript (recommended)? ... no / yes
√ Which style would you like to use? » Default
√ Which color would you like to use as base color? » Slate
√ Where is your global CSS file? ... src/index.css
√ Would you like to use CSS variables for colors? ... no / yes
√ Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) ...
√ Where is your tailwind.config.js located? ... tailwind.config.js
√ Configure the import alias for components: ... @/components
√ Configure the import alias for utils: ... @/lib/utils
√ Are you using React Server Components? ... no / yes
√ Write configuration to components.json. Proceed? ... yes
```

---
---

## **_`Next steps to follow :`_**

- Paste this code to your `tailwind.config.js` : 
``` TypeScript 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

- Paste this code to your `vite.config.js` : 
``` TypeScript 

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

```

## Redux setup
---
### Paste this code in `store.ts` file

``` TypeScript
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer : {}
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```
### Paste this code in `hooks.ts` file

``` JavaScript 
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

## Create all necessary folders and files

### Folders
---

* ___components___ (for all components) : src > __`components`__ 

* ___pages___ (for all Pages routes) : src > __`pages`__

* ___utils___ (for all utility) : src > __`utils`__

* ___lib___ (for all external libraries) : src > __`lib`__

* ___config___ (for all types of configuration) : src > __`config`__

* ___routes___ (for all types of routes) : src > __`routes`__

* ___redux___ (for all redux application files) : src > __`redux`__

* ___store.ts___ (for store reducer of redux) : src > redux > __`store.ts`__

* ___hooks.ts___ (for hooks reducer of redux) : src > redux > __`hooks.ts`__

* ___styles___ (for all styles) : src > __`styles`__

* ___images___ (for all images) : src > assets > __`images`__

* ___icons___ (for all icons) : src > assets > __`icons`__

* ___ui___ (for all ui) : src > components > __`ui`__

* ___form___ (for all form) : src > components > __`form`__

* ___layout___ (for all layout) : src > components > __`layouts`__

* ___hooks___ (for all hooks) : src > __`hooks`__

* ___.env.local___ (for all envitonmnet variable files) :  __`.env.local`__

* ___.env.example___ (for all envitonmnet variable files) :  __`.env.example`__

***
***

- #### Delete App.css file
- #### Delete all from index.css file
- #### Delete all from App.tsx file, just keep the function with a html tag

***
### Files
---
* src > compionents > layouts > MainLayout.tsx


---


## **_`Instructions about how to run this application locally`_**

* Ccreate A folder in your computer
* Go to cmd according to file path
* Clone this project by this command : ``` 
git clone "paste the repo link here" ```

* Open Your Code With VSC
* Paste This Command : ``` npm init -y ```
* Create `.env` file in root folder
* Add your mongo server with your project
* Add other environment variables in `.env` file
* Run the project by this command: ``` npm run start:dev```

* Project will run at : 
[http://localhost:5173](http://localhost:5173)# l2-b2-assignment-6-fronten-Upoma218
# smartphone-dashboard-client
