# Getting Started with Character Maker

#### Why?
Because I want to have a simple example with RxJS where I'm able to learn new topics :)

## How to: run locally
- Node.js (>= 16) is installed
- yarn or npm is installed
- run `yarn install`
- run `yarn start`

## How to: deploy
0. Change version in the `package.json`.
1. Merge all changes to the master.
2. Refresh master locally. \
`git pull origin master`
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

# Available Scripts
In the project directory, you can run:

- `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test` (NOT YET)
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- `yarn build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.\
The app is ready to be deployed!

- `yarn deploy`
Deploy the app for production using gh-pages module.
