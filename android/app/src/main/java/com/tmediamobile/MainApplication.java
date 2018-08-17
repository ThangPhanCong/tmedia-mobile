package com.tmediamobile;

import android.support.annotation.Nullable;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.facebook.react.shell.MainReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    @Override
    protected ReactNativeHost createReactNativeHost() {
        return new NavigationReactNativeHost(this) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new PickerPackage(),
            new RNDeviceInfo()
      );
    }
}