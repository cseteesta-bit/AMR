# Optional Android wrapper with Capacitor

The project is already an installable PWA. To produce a native Android project, wrap the static app with Capacitor.

1. Install Node.js and Android Studio.
2. From the project folder, install Capacitor packages:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

3. Initialise Capacitor and use this project folder as the web directory:

```bash
npx cap init "BCS 100 Pro" "com.example.bcs100pro" --web-dir .
npx cap add android
npx cap sync android
npx cap open android
```

4. In Android Studio, change the application ID, signing configuration, icons, privacy disclosures and release name before building an AAB/APK.

For a public release, use a real domain and unique package ID, add a privacy policy, test offline behaviour and review all educational content.
