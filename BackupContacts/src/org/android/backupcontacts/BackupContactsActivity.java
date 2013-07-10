package org.android.backupcontacts;

import java.lang.Thread.UncaughtExceptionHandler;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.util.Log;

public class BackupContactsActivity extends DroidGap {
    /** Called when the activity is first created. */
	
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	try {
        	super.onCreate(savedInstanceState);
        	//setContentView(R.layout.main);
        	Log.d("BackupContactsActivity", "Antes de direccionar a index.html");
        	super.loadUrl("file:///android_asset/www/index.html");
        	Log.d("BackupContactsActivity", "Después de direccionar a index.html");
        }
        catch (Exception ex) {
        	Log.d("BackupContactsActivity", ex.toString());
        	Log.e("BackupContactsActivity", ex.toString());
        	ex.printStackTrace();
        }
    }
    
    
    
}