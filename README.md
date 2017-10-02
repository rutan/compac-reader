# Compac Reader

Compac Reader is a novel reader for Android.

## how to build

### for development

```bash
$ npm install
$ cd workspace/compac-novel-view
$ npm install
$ npm run build
$ npm run run:android
```

### for release build

preparation (only once. and see [react-native guide](https://facebook.github.io/react-native/docs/signed-apk-android.html) )

```bash
$ cd android
$ cp ./gradle.properties.sample ./gradle.properties
$ vim ./gradle.properties
```

and build

```bash
$ cd android
$ ./gradlew assembleRelease
```

## License
MIT License

