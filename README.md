# introcepttest

## About this project

This project is for only Android platform and it is slightly different from the typical React Native project generated from react native CLI. React Native uses Custom Android View as a root view and consist of only one Activity i.e MainActivity. This project uses android fragment instead of Custom View and it consists multiple activities explicitly made from Android Studio. The idea is to make all the activities using Android Studio and in inside each activity insert React Native's JSX view as an android fragment.
In this app I have declared only two activities i.e MainActivity and FormActivity and inserted two screen view of React Native i.e "main" and "form" as an android fragment. I have written a very simple native module to push and pop activities. Thus, in this app React Native is only used as a view layer of and Android app, Reanimated is used for animations and Redux is used for state management. For offline uses, I have used redux-persist to persist all the redux stores inside file storage system of android.


## Why this Custom Android approach

Navigation is always an issue in React Native. Multiple Activities exist in android for a reason and I want to experiment how it feels to build an app using best part of both Android and React Native. Much to my suprise it has worked exceptionally well and my apps are getting native look and feel while the users are navigating. Using this approach I have successfully build the top tabs and bottom tabs and currently experimenting with shared screen transition. This is not ideal for production as it requires android knowledge and you need to write code in two differenet language but these kind of experimente are fun.

## How to insert React Native View as and Android fragment.

You can use react-native-android-fragment repo to do that or you can use AndroidFragment class from react-native android or if you want to write your own fragment class that takes the React Native's JSX view as an android fragment then follow the following steps:

1.) Make a Fragment class called ReactFragment.java

    import android.annotation.TargetApi;
    import android.app.Activity;
    import android.os.Build;
    import android.os.Bundle;
    import android.view.KeyEvent;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;

    import androidx.annotation.NonNull;
    import androidx.annotation.Nullable;
    import androidx.fragment.app.Fragment;

    import com.facebook.infer.annotation.Assertions;
    import com.facebook.react.ReactApplication;
    import com.facebook.react.ReactInstanceManager;
    import com.facebook.react.ReactNativeHost;
    import com.facebook.react.ReactRootView;
    import com.facebook.react.common.LifecycleState;
    import com.facebook.react.devsupport.DoubleTapReloadRecognizer;
    import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
    import com.facebook.react.modules.core.PermissionAwareActivity;
    import com.facebook.react.modules.core.PermissionListener;


    public class ReactFragment extends Fragment implements PermissionAwareActivity {

    public static final String ARG_COMPONENT_NAME = "arg_component_name";
    public static final String ARG_LAUNCH_OPTIONS = "arg_launch_options";

    /**
     * @param componentName The name of the react native component
     * @param launchOptions Optional launch options
     * @return A new instance of fragment ReactFragment.
     */
    private static ReactFragment newInstance(@NonNull String componentName, Bundle launchOptions) {
        ReactFragment fragment = new ReactFragment();
        Bundle args = new Bundle();
        args.putString(ARG_COMPONENT_NAME, componentName);
        args.putBundle(ARG_LAUNCH_OPTIONS, launchOptions);
        fragment.setArguments(args);
        return fragment;
    }

    private String mComponentName;
    private Bundle mLaunchOptions;

    private ReactRootView mReactRootView;

    @Nullable
    private DoubleTapReloadRecognizer mDoubleTapReloadRecognizer;

    @Nullable
    private PermissionListener mPermissionListener;

    // region Lifecycle

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mComponentName = getArguments().getString(ARG_COMPONENT_NAME);
            mLaunchOptions = getArguments().getBundle(ARG_LAUNCH_OPTIONS);
        }
        if (mComponentName == null) {
            throw new IllegalStateException("Cannot loadApp if component name is null");
        }
        mDoubleTapReloadRecognizer = new DoubleTapReloadRecognizer();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mReactRootView = new ReactRootView(getContext());
        mReactRootView.startReactApplication(
                getReactNativeHost().getReactInstanceManager(),
                mComponentName,
                mLaunchOptions);
        return mReactRootView;
    }


    @Override
    public void onResume() {
        super.onResume();
        if (getReactNativeHost().hasInstance()) {
            getReactNativeHost().getReactInstanceManager().onHostResume(getActivity(), (DefaultHardwareBackBtnHandler) getActivity());
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        if (getReactNativeHost().hasInstance()) {
            getReactNativeHost().getReactInstanceManager().onHostPause(getActivity());
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (mReactRootView != null) {
            mReactRootView.unmountReactApplication();
            mReactRootView = null;
        }
        if (getReactNativeHost().hasInstance()) {
            ReactInstanceManager reactInstanceMgr = getReactNativeHost().getReactInstanceManager();

            // onDestroy may be called on a ReactFragment after another ReactFragment has been
            // created and resumed with the same React Instance Manager. Make sure we only clean up
            // host's React Instance Manager if no other React Fragment is actively using it.
            if (reactInstanceMgr.getLifecycleState() != LifecycleState.RESUMED) {
                reactInstanceMgr.onHostDestroy(getActivity());
                getReactNativeHost().clear();
            }
        }
    }

    // endregion

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (mPermissionListener != null &&
                mPermissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
            mPermissionListener = null;
        }
    }

    // region PermissionAwareActivity

    @Override
    public int checkPermission(String permission, int pid, int uid) {
        return getActivity().checkPermission(permission, pid, uid);
    }

    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public int checkSelfPermission(String permission) {
        return getActivity().checkSelfPermission(permission);
    }

    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        mPermissionListener = listener;
        requestPermissions(permissions, requestCode);
    }

    // endregion

    // region Helpers

    /**
     * Helper to forward hardware back presses to our React Native Host
     */
    public void onBackPressed() {
        if (getReactNativeHost().hasInstance()) {
            getReactNativeHost().getReactInstanceManager().onBackPressed();
        }
    }

    /**
     * Helper to forward onKeyUp commands from our host Activity.
     * This allows ReactFragment to handle double tap reloads and dev menus
     *
     * @param keyCode keyCode
     * @param event   event
     * @return true if we handled onKeyUp
     */
    @SuppressWarnings("unused")
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        boolean handled = false;
        if (getReactNativeHost().getUseDeveloperSupport() && getReactNativeHost().hasInstance()) {
            if (keyCode == KeyEvent.KEYCODE_MENU) {
                getReactNativeHost().getReactInstanceManager().showDevOptionsDialog();
                handled = true;
            }
            boolean didDoubleTapR = Assertions.assertNotNull(mDoubleTapReloadRecognizer).didDoubleTapR(keyCode, getActivity().getCurrentFocus());
            if (didDoubleTapR) {
                getReactNativeHost().getReactInstanceManager().getDevSupportManager().handleReloadJS();
                handled = true;
            }
        }
        return handled;
    }

    // endregion

    /**
     * Get the {@link ReactNativeHost} used by this app. By default, assumes
     * {@link Activity#getApplication()} is an instance of {@link ReactApplication} and calls
     * {@link ReactApplication#getReactNativeHost()}. Override this method if your application class
     * does not implement {@code ReactApplication} or you simply have a different mechanism for
     * storing a {@code ReactNativeHost}, e.g. as a static field somewhere.
     */
    protected ReactNativeHost getReactNativeHost() {
        return ((ReactApplication) getActivity().getApplication()).getReactNativeHost();
    }

    /**
     * Builder class to help instantiate a {@link ReactFragment}
     */
    public static class Builder {

        private final String mComponentName;
        private Bundle mLaunchOptions;

        /**
         * Returns new Builder for creating a {@link ReactFragment}
         *
         * @param componentName The name of your React Native component
         */
        public Builder(String componentName) {
            mComponentName = componentName;
        }

        /**
         * Set the Launch Options for our React Native instance.
         *
         * @param launchOptions launchOptions
         * @return Builder
         */
        public Builder setLaunchOptions(Bundle launchOptions) {
            mLaunchOptions = launchOptions;
            return this;
        }

        public ReactFragment build() {
            return ReactFragment.newInstance(mComponentName, mLaunchOptions);
        }

    }
    }
 
 
 ### step 2: Change MainActivity or any other Activity so that it can take React Native component as an android Fragment.
 
    import android.content.Intent;
    import android.os.Bundle;
    import android.view.KeyEvent;
    import androidx.annotation.Nullable;
    import androidx.fragment.app.Fragment;
    import androidx.appcompat.app.AppCompatActivity;
    import com.facebook.react.ReactActivity;
    import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
    import com.introcepttest.fragment.ReactFragment;


    public class MainActivity extends AppCompatActivity  implements DefaultHardwareBackBtnHandler {

    private static final String COMPONENT_NAME = "main";

      @Override
      protected void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);
    setContentView(R.layout.react_layout);

    if (savedInstanceState == null) {
      ReactFragment reactFragment = new ReactFragment.Builder(COMPONENT_NAME).build();
      getSupportFragmentManager().beginTransaction().add(R.id.container_main, reactFragment).commit();
    }

  }

      @Override
      public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
      }

      /**
       * Forward onKeyUp events to the ReactFragment in order to handle double tap
       * reloads and dev menus
       *
       * @param keyCode
       * @param event
       * @return true if event was handled
       */
      @Override
      public boolean onKeyUp(int keyCode, KeyEvent event) {
        boolean handled = false;
        Fragment activeFragment = getSupportFragmentManager().findFragmentById(R.id.container_main);
        if (activeFragment instanceof ReactFragment) {
          handled = ((ReactFragment) activeFragment).onKeyUp(keyCode, event);
        }
        return handled || super.onKeyUp(keyCode, event);
      }


      @Override
      public void onBackPressed() {
        super.onBackPressed();
      }

    }
    
  See the line.
        private static final String COMPONENT_NAME = "main";
  Here "main" is the name of the component registered through AppRegistry module of React Native.
  
  
  ### Step 4: Declare other activities also in similar manner and if you want your activity to resolve a promise and listen an event or need some permissions you need to extend ReactActivity instead of AppCompatActivity.
  
  ### Step 4: Write Native Module to push or pop activities.
  
  You can find many tutorials in the internet describing how to write a native module. Here, I will only write how to go from one activity to another and get Back.
  
  ##### case 1: One activity to another: MainActivity -> FormActivity
        @ReactMethod
        public void goToForm( )
        {
          AppCompatActivity activity = (AppCompatActivity) getCurrentActivity;
          Intent intent = new Intent(activity, FormActivity.class);
          activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                activity.startActivity(intent);
            }
          });
        }
        
 ##### case 2: Go Back from FormActivity
 
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




    


    

