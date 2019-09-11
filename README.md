# Quiztions

## Project setup
* clone the project 
```bash
git clone https://github.com/eslam-fakhry/quiztions.git
cd quiztions
npm i
cd functions 
npm i 
cd ..
```
* install firebase tools
```bash
npm i -g firebase-tools
```
* Next create a new firebase project here https://console.firebase.google.com
* Add authentication method  "Email/Password" in authentication panel 
* Add "real-time" database in database panel
	*  Add some temporary data to preserve it
* Add storage bucket in storage panel
* Copy .env.example to .env
```bash
cp .env.example .env
```
* From overview firebase console register new app
* Update .env with the configuration data generated
```bash
firebase login
```
* with the created firebase projectId 
```bash
firebase use <projectId>
firebase deploy --only storage, database, functions
```
### Run locally
```bash
npm run serve
```
### Run Tests
```bash
npm test
```
### Deploy
```bash
npm run build
firebase deploy --only hosting
```
