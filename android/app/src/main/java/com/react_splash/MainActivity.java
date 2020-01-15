package com.react_splash;

import com.facebook.react.ReactActivity;

import android.os.Bundle; // here
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "react_splash";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // 设置透明状态栏
    // if (Build.VERSION.SDK_INT >= 21) {
    //     View decorView = getWindow().getDecorView();
    //     int option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
    //             | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
    //     decorView.setSystemUiVisibility(option);
    //     getWindow().setStatusBarColor(Color.TRANSPARENT);
    // }
    
    // // 设置透明状态栏和透明导航栏
    // if (Build.VERSION.SDK_INT >= 21) {
	  //   View decorView = getWindow().getDecorView();
	  //   int option = View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
	  //           | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
	  //           | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
	  //   decorView.setSystemUiVisibility(option);
	  //   getWindow().setNavigationBarColor(Color.TRANSPARENT);
	  //   getWindow().setStatusBarColor(Color.TRANSPARENT);
	  // }
  }
}
