# introcepttest

## About this project

This project is for only Android platform and it is slightly different from the typical React Native project generated from react native CLI. React Native uses Custom Android View as a root view and consist of only one Activity i.e MainActivity. This project uses android fragment instead of Custom View and it consists multiple activities explicitly made from Android Studio. The idea is to make all the activities using Android Studio and in inside each activity insert React Native's JSX view as an android fragment.
In this app I have declared only two activities i.e MainActivity and FormActivity and inserted two screen view of React Native i.e "main" and "form" as an android fragment. I have written a very simple native module to push and pop activities. Thus, in this app React Native is only used as a view layer of and Android app, Reanimated is used for animations and Redux is used for state management. For offline uses, I have used redux-persist to persist all the redux stores inside file storage system of android.


## Why this Custom Android approach

Navigation is always an issue in React Native. Multiple Activities exist in android for a reason and I want to experiment how it feels to build an app using best part of both Android and React Native. Much to my suprise it has worked exceptionally well and my apps are getting native look and feel while the users are navigating. Using this approach I have successfully build the top tabs and bottom tabs and currently experimenting with shared screen transition. This is not ideal for production as it requires android knowledge and you need to write code in two differenet language but these kind of experiment is fun.
