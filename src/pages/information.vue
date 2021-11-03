<template lang="">
  <q-page class="bg-dark">
    <div class="row justify-center q-pt-xl">
      <div div="col">
        <q-icon name="auto_stories" class="text-red-10" style="font-size: 4em;" />
      </div>
    </div>
    <div class="row q-pt-md justify-center text-white">
      <div class="col-9 bg-grey-7 shadow-3 q-pl-md q-pr-sm q-pt-sm q-pb-sm rcorners">
        <br><q-icon name="new_releases"  class="text-pink-10" style="font-size: 1.5em;"/> The system was made with the purpose of showing and sharing my knowledge at the same time this project which you can use freely as long as just don't used my project in your portfolio please.<br><br>
        <q-icon name="share" class="text-pink-10" style="font-size: 1.5em;" /> github open link <a href="https://github.com/lobobogard/portafolioGO" target="_blank" style="color:white;">BACK END</a> and <a href="https://github.com/lobobogard/projectJWT" target="_blank" style="color:white;">FRONT END</a><br><br>
         <q-icon name="construction" class="text-pink-10" style="font-size: 1.5em;" /> I used quasar framework 2.0.4, golang 1.16.3, redis and mysql v.14.14 <br><br>
         <q-icon name="keyboard" class="text-pink-10" style="font-size: 1.5em;" /> Comands cli run quasar in mode development <b>"npx quasar dev"</b> and  production <b>"npx quasar build"</b> and after that will be created folder "dist" ready for use in apache or nginx for example
        and if you want create for other options like android, ios, desktop, pwa, ssr you can check the document official <a href="https://quasar.dev/quasar-cli/build-commands" target="_blank" style="color:white;">QUASAR CLI.</a><br><br>
         <q-icon name="keyboard" class="text-pink-10" style="font-size: 1.5em;" /> Comand golang cli will use libray air for execute just run comand <b>"air"</b> and ready is working for listen.<br><br>
         <q-icon name="vpn_key" class="text-pink-10" style="font-size: 1.5em;" /> Golang you need to create the public and private keys with these commands ubuntu linux <b>"openssl genrsa -out private.rsa 1024"</b> next <b>"openssl rsa -in private.rsa -pubout > public.rsa.pub"</b> and after that take the keys put in you folder secure
        in the last put the address key in the <b>"ENV"</b> file <b>"privateKey"</b> and <b>"publicKey"</b> but for testing you need to put in the file <b>authentication.go</b> the address direct because have error for use the component godotenv v1.3.0. may be late I will fix this error function. <br><br>
         <q-icon name="people" class="text-pink-10" style="font-size: 1.5em;" /> In the menu you can visualize <b>USER</b> and <b>ADMIN</b> what mean that ?? simple remember is only purpose project, so that it is not separated into two accounts, create it so that you could be a user and administrator at the same time and so you can manage the settings
        in a simple way without having to go out, change settings in the admin account and return as a user but admin havent JWT restrictions for handling configurations.<br><br>
         <q-icon name="album" class="text-pink-10" style="font-size: 1.5em;" /> For token management I use redis since redis offers us a very powerful and stable database which can be used for scalability vertically and even horizontally, however I would have to make some extra configurations for that management.<br><br>
         <q-icon name="hourglass_top" class="text-pink-10" style="font-size: 1.5em;" /> The system uses two tokens one is for access to the application with an expiration of 1 minutes and the refresh token has an expiration of 20 minutes for testing purposes however it should generally expire in hours or months as a good practice.<br><br>
         <q-icon name="extension" class="text-pink-10" style="font-size: 1.5em;" /> Golang packages such as gorm, mux, air and among others are included that are implemented for regular use and on the front end it also includes some extra packages such as apexcharts, vue-router-multiguard, and most of them are already included by quasar which is what I love this framework.<br><br>
         <q-icon name="toggle_on" class="text-pink-10" style="font-size: 1.5em;" /> In the profile module you can see different selects this was done so that you could see what quasar offers but at the same time it was not easy since you have to know how to manipulate the data both in the front end and in the back end and here Everything is done without the need to reinvent the wheel. <br><br>
         <q-icon name="devices_other" class="text-pink-10" style="font-size: 1.5em;" /> In the backend I managed the design that was both for desktop and mobile, probably something may not be very well adjusted, however, for the most part, you will see that the rendering works very well.<br><br>
         <q-icon name="support_agent" class="text-pink-10" style="font-size: 2em;"/> Finally, I can say that I wanted to add more improvisations such as seeders, the table does not have pagination and among other things and I am also aware that there may be code refactoring some bugs but for that it is here on github and you can download it, improve it, adapt it to your needs so thank you and I hope this can give me a very good job that was mainly done.<br><br>
      </div>
    </div>
    <br><br>
  </q-page>
</template>
<script>

export default {
  setup () {
  }
}
</script>
<style lang="css" scoped>
.rcorners {
  border-radius: 10px;
  padding: 8px;
}
</style>
