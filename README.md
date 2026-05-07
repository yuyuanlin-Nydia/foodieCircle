# foodieCircle

-採用React Native與 Expo 開發  
-利用Expo Router實現直覺的文件式路由導航，支援分頁標籤切換與動態路由跳轉  
-提供直觀的美食分類瀏覽、整合動態輪播圖與平滑的手勢操作和基於Context API 實現的收藏清單管理

## design source:

-https://dribbble.com/shots/7836166-Cooking-Recipe-App  
-https://dribbble.com/shots/11878190-Social-web-app-proposal-for-recipes

## 畫面UI

![Imgur](https://i.meee.com.tw/xMPkw9U.png)
![Imgur](https://i.meee.com.tw/UjLmNX6.png)
![Imgur](https://i.meee.com.tw/ds3swC7.png)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

<!-- # Jenkins

--透過 git push 自動觸發部屬: https://zoejoyuliao.medium.com/%E9%80%8F%E9%81%8E-github-webhook-%E8%A7%B8%E7%99%BC%E6%9C%AC%E5%9C%B0-jenkins-pipeline-%E8%AE%93%E4%BD%A0-push-code-%E5%88%B0-github-%E5%B0%B1%E6%9C%83%E8%87%AA%E5%8B%95%E8%B7%91-ci-cd-7c4bd7a22446

--sh 無法在 windows 執行
Manage Jenkins > Configure System
找到 Shell executable
默認是 /bin/sh（Linux 环境）
可修改為 C:\Program Files\Git\bin\bash.exe 就可以順利在 WINDOWS 執行 sh -->
