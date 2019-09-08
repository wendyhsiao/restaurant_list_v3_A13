# 喜好餐廳列表

可以蒐集喜好的餐廳，並可以看到餐廳簡單的介紹(店名、照片、分類等)，點擊餐廳可以看到更詳細的餐廳資訊。

## 環境建置與需求

- Node.js v10.15.3
- MongoDB

#### npm 套件

- nodemon
- body-parser: ^1.19.0
- express: ^4.17.1
- express-handlebars: ^3.1.0
- mongoose: ^5.6.13

## 安裝與執行步驟

#### 安裝方法 1

在終端機(Terminal)輸入

```
git colone https://github.com/wendyhsiao/restaurant_list_v1(A9).git
```

如果在終端機訊息中看見「done」，就表示成功了！

#### 安裝方法 2

先點選 "Clone or download / Download ZIP" 把檔案下載下來，解壓縮。

#### 執行步驟

1.在終端機(Terminal)切換到 restaurant_list_v1(A9) 目錄下

```
cd restaurant_list_v1(A9)
```

2.安裝套件

```
npm install
```

3.使用 nodemon 啟動伺服器

```
nodemon app.js
```

4.在瀏覽器輸入網址 `localhost:3000`即可看到內容

## 功能描述

- 可選擇工程師、設計師或創業家其中一個對象
- 點選【產生幹話】按鈕
- 將隨機產生一句對應此職業的幹話內容

## 專案畫面

![image](<https://github.com/wendyhsiao/restaurant_list_v1(A9)/blob/master/public/img/index.PNG>)

![image](<https://github.com/wendyhsiao/restaurant_list_v1(A9)/blob/master/public/img/detail.PNG>)

![image](<https://github.com/wendyhsiao/restaurant_list_v1(A9)/blob/master/public/img/edit.PNG>)

![image](<https://github.com/wendyhsiao/restaurant_list_v1(A9)/blob/master/public/img/create.PNG>)
