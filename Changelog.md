# Changelog

All notable changes to this project will be documented in this file.
<!-- 
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). -->

<!-- ## [Unreleased]

### Added 

- Added Dutch translation

### Fixed

- Fixed foldouts in Dutch translation -->

## 2.0.0 - June 21, 2021

### Added

- Added instant order placing in case of weekly and monthly SIP.
- Added separate tabs for SIP in INR and USD market and delete SIP.
- Added portfolio sheets to monitor crypto wallet performance on hourly, daily and weekly basis.
- Added dynamic placeholder for minimum investment amount of each coin.
- Added market column in SIP sheet.
- Added email user feature in case of insufficient wallet balance and increment in minimum SIP investment amount.

### Changed

- Completely revamped the UI of add on.
- Change sheet appearance into dark mode.
- Removed API keys log from cloud logs.
- Used placeOrders instead of placeBuyOrder from Bitbns API.
- Used [this](https://docs.google.com/spreadsheets/d/1EiZsSHq0S9ko7wp6DA5BpuMsEFNNyPBLhXCoq15QiHs/edit?usp=sharing) sheet to fetch minimum volume placeable of each coin.

### Fixed
- Fixed USDT coin pair issue.
- Fixed BNB, MATIC issue by dynamically calculating minimum investment amount for each coin.

## 1.0.0 - June 7,2021

### Added
- Added Bitbns API to google sheets.
- Added SIP functionality for automated low risk investment.
- Find the old version [here](https://docs.google.com/spreadsheets/d/1Tw7CGjA7yJKrvEkH_Myb0hR4KXyoFLLgOGDdGJGRYgU/edit?usp=sharing).


<!-- [2.0.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.3.0...v1.0.0 -->