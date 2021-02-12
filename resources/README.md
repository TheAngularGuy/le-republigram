### Generate android app
```
ionic cordova prepare android --prod --release
```
edit gradle.properties androidX=true
build in android studio *build > generate signed apk > release*
 ```
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks platforms/android/app/release/app-release.apk my-alias
 ```
cd to `platforms/android/app/release/`

```
/Users/mustapha/Library/Android/sdk/build-tools/30.0.3/zipalign -v 4 ./app-release.apk ./app-signes-release.apk
```
(find ~/Library/Android/sdk/build-tools -name "zipalign")
