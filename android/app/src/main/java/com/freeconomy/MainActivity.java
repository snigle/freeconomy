package com.freeconomy;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Intent;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "freeconomy";
    }

    @Override
    protected void onPause() {
        super.onPause();
        AppWidgetManager man = AppWidgetManager.getInstance(getApplicationContext());
        int[] ids = man.getAppWidgetIds(
                new ComponentName(getApplicationContext(),NewAppWidget.class));
        Intent updateIntent = new Intent();
        updateIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        updateIntent.putExtra(NewAppWidget.WIDGET_IDS_KEY, ids);
//        updateIntent.putExtra(MyWidgetProvider.WIDGET_DATA_KEY, data);
        getApplicationContext().sendBroadcast(updateIntent);
    }
}
