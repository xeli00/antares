import getOS from './libs/getOS';

document.addEventListener('DOMContentLoaded', () => {
   const winBlock = document.getElementById('winBlock');
   const linuxBlock = document.getElementById('linuxBlock');
   const macBlock = document.getElementById('macBlock');
   const OS = getOS();// TODO: highlight OS block

   fetch('https://api.github.com/repos/fabio286/antares/releases/latest')
      .then(response => response.json())
      .then(data => {
         const linux = {
            amd64: data.assets.find(asset => /^(.*)x86_64.AppImage$/.test(asset.browser_download_url)),
            arm64: data.assets.find(asset => /^(.*)arm64.AppImage$/.test(asset.browser_download_url)),
            arm32: data.assets.find(asset => /^(.*)armv7l.AppImage$/.test(asset.browser_download_url))
         };
         const windows = {
            amd64: data.assets.find(asset => /^(.*)win.exe$/.test(asset.browser_download_url)),
            portable: data.assets.find(asset => /^(.*)portable.exe$/.test(asset.browser_download_url))
         };
         const mac = {
            amd64: data.assets.find(asset => /^(.*)mac.dmg$/.test(asset.browser_download_url)),
            arm64: data.assets.find(asset => /^(.*)arm64.dmg$/.test(asset.browser_download_url))
         };

         for (const dist in linux) {
            if (!linux[dist]) continue;
            linuxBlock.innerHTML += `<a class="button is-link my-2" href="${linux[dist].browser_download_url}">${linux[dist].name}</a>`;
         }

         for (const dist in windows) {
            if (!windows[dist]) continue;
            winBlock.innerHTML += `<a class="button is-link my-2" href="${windows[dist].browser_download_url}">${windows[dist].name}</a>`;
         }

         for (const dist in mac) {
            if (!mac[dist]) continue;
            macBlock.innerHTML += `<a class="button is-link my-2" href="${mac[dist].browser_download_url}">${mac[dist].name}</a>`;
         }
      }).catch(console.log);
});
