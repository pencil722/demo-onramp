# demo-onramp


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

