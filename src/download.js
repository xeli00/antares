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
            amd64: {
               data: data.assets.find(asset => /^(.*)x86_64.AppImage$/.test(asset.browser_download_url)),
               arch: '64-bit',
               format: 'AppImage'
            },
            arm64: {
               data: data.assets.find(asset => /^(.*)arm64.AppImage$/.test(asset.browser_download_url)),
               arch: 'ARMv8',
               format: 'AppImage'
            },
            arm32: {
               data: data.assets.find(asset => /^(.*)armv7l.AppImage$/.test(asset.browser_download_url)),
               arch: 'ARMv7',
               format: 'AppImage'
            }
         };
         const windows = {
            amd64: {
               data: data.assets.find(asset => /^(.*)win_x64.exe$/.test(asset.browser_download_url)),
               arch: '64-bit',
               format: 'exe'
            },
            portable: {
               data: data.assets.find(asset => /^(.*)portable.exe$/.test(asset.browser_download_url)),
               arch: '64-bit',
               format: 'portable, exe'
            }
         };
         const mac = {
            amd64: {
               data: data.assets.find(asset => /^(.*)mac_x64.dmg$/.test(asset.browser_download_url)),
               arch: '64-bit',
               format: 'dmg'
            },
            arm64: {
               data: data.assets.find(asset => /^(.*)arm64.dmg$/.test(asset.browser_download_url)),
               arch: 'ARMv8',
               format: 'dmg'
            }
         };

         for (const dist in linux) {
            if (!linux[dist]) continue;
            linuxBlock.innerHTML += `
               <tr>
                  <td class="has-text-light has-text-left">${linux[dist].arch}</td>
                  <td class="has-text-light">${linux[dist].format}</td>
                  <td class="has-text-right"><a class="button is-primary is-small" href="${linux[dist].data.browser_download_url}" title="${linux[dist].data.name}">download</a></td>
               </tr>`;
         }

         for (const dist in windows) {
            if (!windows[dist]) continue;
            winBlock.innerHTML += `
               <tr>
                  <td class="has-text-light has-text-left">${windows[dist].arch}</td>
                  <td class="has-text-light">${windows[dist].format}</td>
                  <td class="has-text-right"><a class="button is-primary is-small" href="${windows[dist].data.browser_download_url}" title="${windows[dist].data.name}">download</a></td>
               </tr>`;
         }

         for (const dist in mac) {
            if (!mac[dist]) continue;
            macBlock.innerHTML += `
               <tr>
                  <td class="has-text-light has-text-left">${mac[dist].arch}</td>
                  <td class="has-text-light">${mac[dist].format}</td>
                  <td class="has-text-right"><a class="button is-primary is-small" href="${mac[dist].data.browser_download_url}" title="${mac[dist].data.name}">download</a></td>
               </tr>`;
         }
      }).catch(console.log);
});
