/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import "CodePush.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "ReactNativeNavigation.h"
#import "RCTLinkingManager.h"
#import "ReactNativeConfig.h"
#import <Firebase.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  #ifdef DEBUG
  #else
    jsCodeLocation = [CodePush bundleURL];
  #endif

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  [FIRApp configure];
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  return YES;
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  
  BOOL handledFB = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                  openURL:url
                                                        sourceApplication:sourceApplication
                                                               annotation:annotation
                    ];
  
  BOOL handledRCT = [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
  
  return handledFB || handledRCT;
}
@end
