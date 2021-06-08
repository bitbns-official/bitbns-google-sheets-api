<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">


  <h3 align="center">Bitbns Google Sheets API</h3>

  <p align="center">
    Bitbns Google Sheets API
    <br />
    <a href="https://github.com/bitbns-official/bitbns-google-sheets-api"><strong>Explore the docs »</strong></a>
    <br />
    ·
    <a href="https://github.com/bitbns-official/bitbns-google-sheets-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/bitbns-official/bitbns-google-sheets-api/issues">Request Feature</a>
  </p>
</p>
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-bitbns">About Bitbns</a>
      <ul>
      </ul>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
<!--     <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#issues">Issues</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About Bitbns

www.bitbns.com

### Built With

- [JQuery](https://jquery.com)
- [Google Apps Script](https://developers.google.com/apps-script)
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)


## Getting Started

1. Make a copy of [this](https://docs.google.com/spreadsheets/d/12krDdNE7VfXxrGJnoIKJ3euzZF-7E_1CercWDF1unO4/edit?usp=sharing) google sheet.
2. Go to bitbns website to generate API keys or click on this [link](https://bitbns.com/trade/#/api-trading/)
3. Copy the public and private key and paste them into config sheet in the corresponding cells.
4. Go to add ons and select Bitbns API SIP and then select Bitbns SIP. This adds a sidebar in your copy of sheet.
5. It is important that you use primary google account for trading. If not,then you would have to the application in incognito mode because of primary account issue with google apps script.


### Usage

- After adding the sidebar, you can simply select the token from the given list, and select the frequency and the amount to be invested. The minimum amount should be greater than equal to ₹100. You will get a confirmation alert on the screen when placing the SIP.
- After the SIP is placed ,the details about that would appear on the SIP sheet.
- To delete an SIP, you have to enter the trigger id of the SIP and click on delete SIP. 
- It is very important to not change the trigger id of any SIP as it is very crucial for smooth working of the application. In case you accidentaly change the trigger id and forget what it was originally, you would have to go to the script editor and run the "Delete all SIP" file.
- You can check your bitbns wallet for more details about your purchases and sellings. 
- For more details, [here](https://medium.com/bitbns/introducing-sip-in-any-token-via-google-sheets-api-bitbns-7f32e9cc169d) is the medium article about that.


## Issues

- Can't use a secondary account without being in incognito beucase of [this](https://issuetracker.google.com/issues/69270374) issue in GAS(Google Apps Script).

## Acknowledgements

- [Bitbns API](https://github.com/bitbns-official/node-bitbns-api)
- [Google Apps Script](https://developers.google.com/apps-script)
- [Img Shields](https://shields.io)
- [MIT License](https://spdx.org/licenses/MIT.html)


## License

MIT License

Copyright (c) August 2017-2021

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<!-- CONTACT -->

## Contact

- [Bitbns Customer Support](https://bitbns.com/contact-us/) 


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/bitbns-official/bitbns-google-sheets-api.svg?style=for-the-badge
[contributors-url]: https://github.com/bitbns-official/bitbns-google-sheets-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bitbns-official/bitbns-google-sheets-api.svg?style=for-the-badge
[forks-url]: https://github.com/bitbns-official/bitbns-google-sheets-api/network/members
[stars-shield]: https://img.shields.io/github/stars/bitbns-official/bitbns-google-sheets-api.svg?style=for-the-badge
[stars-url]: https://github.com/bitbns-official/bitbns-google-sheets-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/bitbns-official/bitbns-google-sheets-api.svg?style=for-the-badge
[issues-url]: https://github.com/bitbns-official/bitbns-google-sheets-api/issues
[license-shield]: https://img.shields.io/github/license/bitbns-official/bitbns-google-sheets-api.svg?style=for-the-badge
[license-url]: https://github.com/bitbns-official/bitbns-google-sheets-api/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/bitbnsinc/

