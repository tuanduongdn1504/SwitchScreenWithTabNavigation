// import FBSDK from 'react-native-fbsdk';
// // import { GoogleSignin } from 'react-native-google-signin';

// const { LoginManager, AccessToken } = FBSDK;

// export const googleSignInApi = () => {
//   // return new Promise((resolve, reject) => {
//   //   GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
//   //     GoogleSignin.configure({
//   //       iosClientId: config.GOOGLE_CLIENT_ID,
//   //       scopes: [
//   //         'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email',
//   //       ],
//   //       webClientId: config.GOOGLE_WEB_CLIENT_ID,
//   //       offlineAccess: true,
//   //     }).then(() => {
//   //       // GoogleSignin.revokeAccess()
//   //       // .then(() => {
//   //       GoogleSignin.currentUserAsync().then(user => {
//   //         console.log('USER', user);
//   //         if (user) {
//   //           GoogleSignin.signOut().then(() => {
//   //             subGoogleSignIn(resolve, reject);
//   //           });
//   //         } else {
//   //           subGoogleSignIn(resolve, reject);
//   //         }
//   //       }).done();

//   //       // try {
//   //       //   GoogleSignin.signOut()
//   //       //   .then(() => {
//   //       //     subGoogleSignIn(resolve, reject);
//   //       //   })
//   //       // } catch (err) {
//   //       //   subGoogleSignIn(resolve, reject);
//   //       // }
//   //     }, err => {
//   //       reject(err);
//   //     });
//   //   }, err => {
//   //     reject(err);
//   //   });
//   // });
// };

// const subGoogleSignIn = (resolve, reject) => {
//   if (Platform.OS == 'android') {
//     GoogleSignin.signIn().then((user) => {
//       if (Platform.OS == 'android') {
//         RNGoogleSignin.getAccessToken(user).then((token) => {
//           resolve(token);
//         }).catch((err) => {
//           reject(err);
//         });
//       }
//       // yield put(Actions.googleLoginFailure({error: 'GOOGLE_CLIENT_ID invalid'}));
//     }).catch((err) => {
//       console.log(err);
//       reject(err);
//     }).done();
//   } else {
//     GoogleSignin.signIn().then((user) => {
//       console.log(user);
//       resolve(user.accessToken);
//     }).catch((err) => {
//       console.log(err);
//       reject(err);
//     }).done();
//   }
// };

// export const facebookSignInApi = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       LoginManager.logOut();
//       LoginManager.logInWithReadPermissions(['email', 'public_profile']).then((result) => {
//         // console.log(result);
//         if (result.isCancelled) {
//           reject('Login cancel.');
//         } else {
//           AccessToken.getCurrentAccessToken().then((data) => {
//             // console.log(data);
//             resolve(data.accessToken.toString());
//           }, (err) => {
//             console.log(err);
//             reject(err);
//           });
//         }
//       }, (err) => {
//         console.log(err);
//         reject(err);
//       });
//     } catch (err) {
//       console.log(err);
//       LoginManager.logInWithReadPermissions(['email', 'public_profile']).then((result) => {
//         if (result.isCancelled) {
//           reject('Login cancel.');
//         } else {
//           AccessToken.getCurrentAccessToken().then((data) => {
//             resolve(data.accessToken.toString());
//           }, (err) => {
//             console.log(err);
//             reject(err);
//           });
//         }
//       }, (err) => {
//         console.log(err);
//         reject(err);
//       });
//     }
//   });
// };

// // const twitterSignIn = () => {
// //   return new Promise(((resolve, reject) => {
// //     RNTwitterSignIn.init(config.TWITTER_KEY.consumerKey, config.TWITTER_KEY.consumerSecret);
// //     RNTwitterSignIn.logIn().then(loginData => {
// //       const { authToken, authTokenSecret } = loginData;
// //       if (authToken && authTokenSecret) {
// //         resolve({ authToken, authTokenSecret });
// //       }
// //     }).catch(error => {
// //       console.log(error);
// //       reject(error);
// //     });
// //   }));
// // };
