# README

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for?

- Quick summary
- Version
- [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up?

- $npm install -g react-native-rename
- $npm install -g plop
- react-native-rename "projectName"
- $npm install
- $npm run createIconFont
- $cd ios
- remove Pods and podfile.lock (replace projectName in podfile)
- $pod install
  (https://medium.com/@xwildeyes/remove-uninstall-deintegrate-cocoapods-from-your-xcode-ios-project-c4621cee5e42)

### How do I create new reducer?

- $plop
- select "generate redux"
- enter reducer name.
-

#### How do I ignore unuse actions?

- go redux/SomethingRedux/actions.js
- add unuse actions to array "IGNORE_ACTIONS = []";
- The Actions you can ignore: ['GET_ALL', 'GET_ONE', 'DELETE', 'EDIT', 'CREATE']

### Contribution guidelines

### Who do I talk to?

- Repo created by Tuan Duong
- Other community or team contact: tuanduongdn1504@gmail.com
  Successfully added the "tutor-ios" app, along with the following default deployments:
  ┌────────────┬──────────────────────────────────────────────────────────────────┐
  │ Name │ Deployment Key │
  ├────────────┼──────────────────────────────────────────────────────────────────┤
  │ Production │ 0uYKhZBsWPEDZ7BY8AetMuWUl4oUaf77207a-e3bd-4f00-a8a5-15bc1df99708 │
  ├────────────┼──────────────────────────────────────────────────────────────────┤
  │ Staging │ pYXGwEfz0QAF60pGJ3WP9T5pG2ZPaf77207a-e3bd-4f00-a8a5-15bc1df99708 │
  └────────────┴──────────────────────────────────────────────────────────────────┘
  Successfully added the "tutor-android" app, along with the following default deployments:
  ┌────────────┬──────────────────────────────────────────────────────────────────┐
  │ Name │ Deployment Key │
  ├────────────┼──────────────────────────────────────────────────────────────────┤
  │ Production │ aaV4DQU3VmFsF4396cTB9p2v-swQaf77207a-e3bd-4f00-a8a5-15bc1df99708 │
  ├────────────┼──────────────────────────────────────────────────────────────────┤
  │ Staging │ yxRa8jG-LkDLBtSj6-4XvHna0hmoaf77207a-e3bd-4f00-a8a5-15bc1df99708 │
  └────────────┴──────────────────────────────────────────────────────────────────┘

### Error: ENFILE: file table overflow, scandir...

Last login: Tue Oct 16 06:08:21 on ttys001
➜ ~ echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
Password:
kern.maxfiles=65536
➜ ~ echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
kern.maxfilesperproc=65536
➜ ~ sudo sysctl -w kern.maxfiles=65536
kern.maxfiles: 12288 -> 65536
➜ ~ sudo sysctl -w kern.maxfilesperproc=65536
kern.maxfilesperproc: 10240 -> 65536
➜ ~ ulimit -n 65536
➜ ~
