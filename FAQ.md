# Frequently Asked Questions

- [How to get started?](#how-to-get-started?)
- [How to Add an SIP ?](#How-to-Add-an-SIP?)
- [How to delete an SIP?](#How-to-delete-an-SIP?)
- [FAQs](#FAQs)
- [Known Issues](#Know-Issues)

## How to get started?
1. Create a copy of [this](https://docs.google.com/spreadsheets/d/12krDdNE7VfXxrGJnoIKJ3euzZF-7E_1CercWDF1unO4/edit?ts=60a62c56#gid=0) sheet.
2. Go to [bitbns](https://bitbns.com/) website to generate API keys or go on this [link](https://bitbns.com/trade/#/api-trading/).
3. Copy the public and private key and paste them into the config sheet in the corresponding cells. Never share your api keys with anyone including the bitbns employees. The api keys are unique to you and can be used to buy and sell tokens from your wallet bitbns wallet. 
4. Paste the api keys in their respective fields in the CONFIG sheet.
5. Go to add ons and select Bitbns API SIP and then select Bitbns SIP. This adds a sidebar in your copy of the sheet.
6. Allow the script to run and give the permission asked by the sheet.
7. It is important that you use your primary google account for trading. If not,then you would have to run the application in incognito mode. This is an issue from Google's side and we can’t fix that.
8. Note that the SIP you start here is different from the bitdroplets application.



## How to Add an SIP?
1. Go to the add ons in your sheet and open the SIP add on.
2. Select the token from the given list you want to invest in.
3. Select the frequency and unit with which the token would be bought. Say you place a daily SIP of 100 Rs in ethereum. You would enter the frequency as 1 and unit as day and the amount as 100.


## How to delete an SIP?
1. Simply copy the trigger id of the SIP you want to delete in the Delete SIP box,and click delete SIP. It would then stop buying at that particular frequency. 
2. To sell the currently accumulated token, you would have to do that from your bitbns account.


## FAQs



#### 1. Can we use this on mobile?
- No, as of now, we can’t.

#### 2. What is an SIP?

- SIP stands for systematic investment plan. SIP facility allows an investor to invest a fixed amount of money at predefined intervals in the selected coin. The fixed amount of money can be as low as Rs. 100, while the pre-defined SIP intervals can be on a daily/weekly/monthly basis.

#### 3. Why is token list is not visible?
- Please make sure that you are using your primary account in google sheets. Otherwise the work around is by using the incognito mode.

#### 4. What are the frequency and unit fields?
- These fields denote the intervals in which you want the Sip to be triggered.For example you want an Sip which invests money every day, then the frequency would be 1 and the unit would be day.
<br>
Another example would be you want your Sip to invest money every 2 months, then the frequency would be 2 and the unit would be months.

#### 5. I placed an SIP but it doesn’t reflect in my wallet. What happened?
- Say you placed an SIP at the frequency of 1 day. So your order would be placed within a day. You will get a notification in your bitbns account every time an order is placed by the SIP.

#### 6. I placed a weekly SIP and it has been 5 days but no order has been placed. Why?
- The order would be placed after 7 days from the day of placement. Although we’re collecting feedback and will add instant order place for weekly as well.

## Known Issues
- Can't use a secondary account without being incognito because of [this](https://issuetracker.google.com/issues/69270374?pli=1) issue in GAS(Google Apps Script).
- Matic and BNB have a certain minimum volume requirement to place an order. For matic, minimum volume is 1 matic and for BNB, minimum volume is 0.01 BNB. Since the prices will fluctuate, the price of minimum volume will change as well and thus order might sometimes get rejected if the amount set for the SIP is less than the price of the minimum volume . We are currently working on resolving this issue.
- USDT pairs might not work as expected. That is currently a work in progress.
