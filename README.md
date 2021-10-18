# demo-onramp

## 紀錄campaign tracking 的程式設計原理
### script 發送資料端
- 首次透過user-info(device-id or anything )，網站(info)，網頁行為等等加上指定的campaign id發送到server-side進行紀錄，server-side會回傳一組tracking-id
(須記錄到cookie)。
- 非首次的話，需把tracking-id 也帶過去。
- 之後的操作或是轉頁行為都必須把這組tracking-id 帶過去，方便識別是同一個操作行為。
- 在最後的轉化成功的行為操作上，一樣要打回server side紀錄資訊，但是網頁行為須帶上click 的有效轉化的行為資訊，以及對應的相關數據資訊，如範例提到的"value", "currency"等等

### server 紀錄資料端
- 依據送過來的cliend 端資訊，紀錄下來，如果有tracking-id，則依據tracking-id進行紀錄，沒有則產生一組回傳。
- 僅紀錄，不做多餘的邏輯運算。

## 資料整合轉換
- 會有另外的資料處理程式，進行紀錄後的資料計算及轉換，產生方便後續查詢結果的table 資料，如下方`取得報表的API 設計`的資料table 等等

## 取得報表的API 設計

### 假設
- final step 後，的其他操作不影響轉化率計算(狀態比較單純) 

### 資料
假設儲存結果紀錄的資料內容如下：(僅列出幾個必要資訊示意)
(status : INIT 初始，FAIL 未轉化，CV 轉化成功)


campaign_id|tracking_id|page_info|user_info|status|crt_time|cv_time
:---------:|:---------:|:-------:|:-------:|:----:|:------:|:-----:
CXXXX01    | a105sdu   |  blog   | male    |INIT  |2021/1/1|null
CXXXX01    | a105gyq   |  blog   | male    |FAIL  |2021/1/1|null
CXXXX01    | a105qqq   |  blog   | male    |CV    |2021/1/1|2021/3/5
CXXXX01    | a105ttt   |  site   | female  |INIT  |2021/4/1|null
CXXXX02    | b105sdu   |  blog   | male    |INIT  |2021/1/1|null
CXXXX02    | b105gyq   |  site   | male    |INIT  |2021/1/1|null
CXXXX02    | b105qqq   |  app    | male    |CV    |2021/1/1|2021/2/5
CXXXX02    | b105ttt   |  site   | female  |INIT  |2021/4/1|null


### API
利用campaign 查詢當下該campaign的轉化報表結果
URI  `GET campaign/conversion_report?campaign={campaign_id}`

舉例：
`campaign/conversion_report?campaign="CXXXX01,CXXXX02"`

campaign_id|total_INIT|total_CV|total_CR|30_day_CR|60_day_CR|90_day_CR
:---------:|:--------:|:------:|:------:|:-------:|:-------:|:-----:
CXXXX01    | 4        |  1     | 25%    |0%       |0%       | 25%
CXXXX02    | 4        |  1     | 25%    |0%       |25%      | 25%

