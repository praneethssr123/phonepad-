/* PhonePad support form (same pattern as the DreamTeam Apps support page). */
(function () {
  "use strict";

  var isButtonBlock = false;

  document.addEventListener("DOMContentLoaded", function () {
    var sendButton = document.getElementById("send_button");
    if (!sendButton) return;

    sendButton.addEventListener("click", function () {
      var exitFunc = function (alertText) {
        isButtonBlock = false;
        return alert(alertText);
      };

      if (isButtonBlock) return;
      isButtonBlock = true;

      var emailName = document.getElementById("email_name");
      var emailNameValue = emailName.value;
      if (!emailNameValue) return exitFunc("Email absent");
      if (emailNameValue.length < 6) return exitFunc("Email too short");
      if (!emailNameValue.match(/^[^@]+\@[^.]+\..+$/)) return exitFunc("Bad email");

      var userName = document.getElementById("user_name");
      var userNameValue = userName.value;
      if (!userNameValue) return exitFunc("Username absent");
      if (userNameValue.length < 1) return exitFunc("Username too short");

      var emailBody = document.getElementById("email_body");
      var emailBodyValue = emailBody.value;
      if (!emailBodyValue) return exitFunc("Body absent");
      if (emailBodyValue.length < 2) return exitFunc("Body too short");

      var mailToSender = document.getElementById("mail_to_sender");
      mailToSender.attributes.href.value =
        "mailto:thribhuvan.d@outlook.com?subject=PhonePad app support&body=" +
        encodeURIComponent("Name: " + userNameValue + "\nEmail: " + emailNameValue + "\n\n" + emailBodyValue);
      userName.value = "";
      emailName.value = "";
      emailBody.value = "";
      isButtonBlock = false;
      mailToSender.click();
    });
  });
})();
