import getOS from './libs/getOS';

document.addEventListener('DOMContentLoaded', () => {
   const downloadButton = document.getElementById('download-button');
   const allDownloadButton = document.getElementById('all-downloads-button');
   const OS = getOS();

   if (OS) {
      let extension;
      let className;

      switch (OS) {
         case 'Windows':
            className = 'fa-windows';
            extension = 'exe';
            break;
         case 'MacOS':
            className = 'fa-apple';
            extension = 'dmg';
            break;
         case 'Linux':
            className = 'fa-linux';
            extension = 'AppImage';
            break;
      }

      fetch('https://api.github.com/repos/fabio286/antares/releases/latest')
         .then(response => response.json())
         .then(data => {
            const expString = `^((?!portable).)*${extension}$`;
            const exp = new RegExp(expString);
            const latest = data.assets.find(asset => exp.test(asset.browser_download_url));

            downloadButton.href = latest.browser_download_url;
            downloadButton.innerHTML = `<i class="fa ${className} is-size-5 mr-2"></i> Download Antares (${data.name})`;
            allDownloadButton.classList.toggle('is-hidden');
         }).catch(console.log);
   }
});
