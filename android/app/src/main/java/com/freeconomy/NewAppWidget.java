package com.freeconomy;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.Icon;
import android.util.Log;
import android.view.View;
import android.widget.RemoteViews;

import com.facebook.react.modules.storage.AsyncLocalStorageUtil;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.freeconomy.models.TotalYear;
import com.freeconomy.models.Wallet;
import com.google.gson.Gson;
import com.oblador.vectoricons.VectorIconsModule;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of App Widget functionality.
 */
public class NewAppWidget extends AppWidgetProvider {

    static String TAG = "WalletWidget";

    public static final String WIDGET_IDS_KEY = "mywidgetproviderwidgetids";
    public static final String WIDGET_DATA_KEY = "mywidgetproviderwidgetdata";

    static class ID {
        public int WalletName;
        public int WalletPrice;
        public int Wallet;
        public int WalletBox;
    }

    public static ID[] ids = new ID[] { new ID() {
        {
            WalletName = R.id.wallet_name_1;
            WalletPrice = R.id.wallet_price_1;
            Wallet = R.id.wallet_1;
            WalletBox = R.id.wallet_box_1;
        }
    }, new ID() {
        {
            WalletName = R.id.wallet_name_2;
            WalletPrice = R.id.wallet_price_2;
            Wallet = R.id.wallet_2;
            WalletBox = R.id.wallet_box_2;
        }
    }, new ID() {
        {
            WalletName = R.id.wallet_name_3;
            WalletPrice = R.id.wallet_price_3;
            Wallet = R.id.wallet_3;
            WalletBox = R.id.wallet_box_3;
        }
    }, new ID() {
        {
            WalletName = R.id.wallet_name_4;
            WalletPrice = R.id.wallet_price_4;
            Wallet = R.id.wallet_4;
            WalletBox = R.id.wallet_box_4;
        }
    }, new ID() {
        {
            WalletName = R.id.wallet_name_5;
            WalletPrice = R.id.wallet_price_5;
            Wallet = R.id.wallet_5;
            WalletBox = R.id.wallet_box_5;
        }
    }, };

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(TAG, "on receive event");
        if (intent.hasExtra(WIDGET_IDS_KEY)) {
            int[] ids = intent.getExtras().getIntArray(WIDGET_IDS_KEY);
            if (intent.hasExtra(WIDGET_DATA_KEY)) {
                Object data = intent.getExtras().getParcelable(WIDGET_DATA_KEY);
                // this.update(context, AppWidgetManager.getInstance(context), ids, data);
            } else {
                this.onUpdate(context, AppWidgetManager.getInstance(context), ids);
            }
        } else
            super.onReceive(context, intent);
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId, Wallet[] wallets) {

        CharSequence widgetText = context.getString(R.string.appwidget_text);
        // Construct the RemoteViews object
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.new_app_widget);
        for (int i = 0; i < ids.length; i++) {
            if (wallets.length > i) {
                views.setViewVisibility(ids[i].Wallet, View.VISIBLE);
                views.setTextViewText(ids[i].WalletName, wallets[i].Name);
                views.setInt(ids[i].WalletBox, "setBackgroundColor", Color.parseColor(wallets[i].Icon.Color));
                Double price = wallets[i].Solde;
                for (TotalYear t : wallets[i].TotalPerYear) {
                    price += t.Total;
                }
                views.setTextViewText(ids[i].WalletPrice,
                        new DecimalFormat("#.##").format(price) + " " + wallets[i].Currency.Symbol);
            } else {
                views.setViewVisibility(ids[i].Wallet, View.GONE);
            }
        }

        // Set on click button
        Log.i(TAG, "create activity");
        Intent intent = new Intent(context, MainActivity.class);
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId); // Identifies the particular widget...
        intent.putExtra("module", "freeconomy");
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // Make the pending intent unique...
        PendingIntent pendIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        Log.i(TAG, "set on click");
        views.setOnClickPendingIntent(R.id.mainview, pendIntent);

        // Instruct the widget manager to update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views);

    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {

        SQLiteDatabase readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();
        Log.i(TAG, "start update widget");

        Wallet[] wallets = new Wallet[0];
        if (readableDatabase != null) {
            String impl = AsyncLocalStorageUtil.getItemImpl(readableDatabase, "wallets");
            Gson g = new Gson();
            try {
                wallets = g.fromJson(impl, Wallet[].class);
                Log.i(TAG, "number wallets : " + wallets.length);
            } catch (Exception e) {
                Log.e(TAG, "fail to unmarshal " + e);
            }
        }

        // Filter wallets
        List<Wallet> result = new ArrayList<>();
        for (Wallet wallet : wallets) {
            if (!wallet.Archived) {
                result.add(wallet);
            }
        }
        wallets = result.toArray(new Wallet[0]);

        Log.i(TAG, "update all widgets");

        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId, wallets);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}
