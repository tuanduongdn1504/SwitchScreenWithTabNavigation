package com.rnbaseproject;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {
 @Override
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
    @Override
    protected String getJSMainModuleName() {
      return "index";
      }
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }
    };

    return new ReactGateway(this, isDebug(), host);
  }

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ImagePickerPackage(),
          new RNI18nPackage(),
          new VectorIconsPackage(),
          new RNDeviceInfo(),
          new ReactNativeConfigPackage(),
          new MapsPackage(),
              new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG)
      );
    }
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

}
