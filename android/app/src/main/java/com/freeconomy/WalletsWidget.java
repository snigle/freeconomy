package com.freeconomy;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.RemoteViews;
import android.widget.Toast;

import com.freeconomy.CustomActivity;
import com.freeconomy.R;

/**
 * Implementation of App Widget functionality.
 */
public class WalletsWidget extends AppWidgetProvider {

    static String TAG = "WalletWidget";
    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        Log.i(TAG, "on update");
        try {
            // There may be multiple widgets active, so update all of them
            for (int appWidgetId : appWidgetIds) {
                Log.i(TAG, "create activity");
                Intent intent = new Intent(context, MainActivity.class);
                intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);  // Identifies the particular widget...
                intent.putExtra("module", "freeconomy");
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                // Make the pending intent unique...
                PendingIntent pendIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.wallets_widget);
                Log.i(TAG, "set on click");
                views.setOnClickPendingIntent(R.id.appwidget_text, pendIntent);
                appWidgetManager.updateAppWidget(appWidgetId, views);
            }
        } catch(Exception e) {
            Log.e(TAG, "fail to init view " + e);
        }

    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
        Log.e("toggle_widget","Enabled is being called");
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}
