package com.introcepttest.nativemodule;

import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.introcepttest.MainActivity;

public class ActivityModule extends ReactContextBaseJavaModule {

    public ActivityModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "Activity";
    }


    @ReactMethod
    public void gotoForm()
    {
        MainActivity mainActivity = (MainActivity) getCurrentActivity();
        mainActivity.goToFormActivity();
    }

    @ReactMethod
    public void onBack()
    {
        AppCompatActivity reactActivity = (AppCompatActivity) getCurrentActivity();
        reactActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                reactActivity.onBackPressed();
            }
        });
    }
}
