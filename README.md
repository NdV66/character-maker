# Getting Started with Character Maker

#### Why?
Because I want to have a simple example with RxJS and SOLID where I'm able to learn new topics :)

#### Dictionary
- `trait`
- `percent`

## How to: run locally
- Node.js (>= 16) is installed
- yarn or npm is installed
- run `yarn install`
- run `yarn start`

## How to: deploy
0. Change version in the `package.json`.
1. Merge all changes to the master.
2. Refresh master locally. \
`git pull origin main`
3. Create git tag. \
`git tag -a vX.X.X -m "What was done"` \
`git push --tags`
4. Run `yarn deploy`.
5. Wait... wait...
6. Go to the `https://ndv66.github.io/character-maker/`
7. See your changes :)

# Folder structure

#### `/context`
A place where all models (include model and lang managers) are initialized.

#### `/defaults`
Files with all defaults names, configurations etc.

#### `/langs`
Files with translations.

#### `/models`
All  models for store and manipulate any kind of data.

###### `/models/pureModels`
All basics models for store and manipulate any kind of data.\
These models can be simple or more advanced.

###### `/models/viewModels`
Dedicated model for every logical part of the page

###### `/models/context`
Application context (global settings and data - should be available in the whole app)

#### `/styles`
All app themes (light, dark) variables and basic plain CSS (like @font-face).

#### `/tools`
All helpers, tools etc.

#### `/types`
All more important or global types in the application.

###### `/types/interfaces`
All interfaces for models

#### `/view`
All views of the applications.

###### `/view/elements`
All basic elements with ots styles, like buttons, inputs etc.

###### `/view/page`
All main elements of the main page.

#### `/tests`
All unit tests are welcome here :)

# Code pattern
Connections between described above elements are showed here:

![See doc/pattern.jpg for more information about the app flow.](./doc/pattern.jpeg "Pattern")

# Dev tips & tricks
#### How to add new model to the app?
1. Prepare interface for this model and place it inside `/types/interfaces` (and export this interface).
- interface name should start with "I", for example: `IAppTheme`.
- file should have the same name as this interface.
2. Add this new interface to the `index.js` inside `/types/interfaces` (use `export * from './INewInterface'`).
3. Decide which type of model should be your and select a correct folder (`/models/context`, `/models/pureModel` or `/models/viewModel`).
- class name should be name of the implemented interface, but without "I" and with "Model" word at the end, for example: `AppThemeModel`  from `IAppTheme` interface name.
- file should have the same name as this model (class).
4. Implement your new model (and implements its interface) and export it.
5. Add this new model to the `index.js` inside `/model/<type>` (use `export * from './INewInterface'`).
6. Create instance of your model in the `/context/manager.ts` file
7. Add this instance to the `MODELS` in the `/context/manager.ts` file (if necessary)
8. Prepare unit tests for you model.

#### How to add / edit impacts?

# Available Scripts
In the project directory, you can run:

- `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- `yarn build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.\
The app is ready to be deployed!

- `yarn deploy`
Deploy the app for production using gh-pages module.

TODO
- turn on/off (UI) traits impact
