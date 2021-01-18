document.addEventListener('DOMContentLoaded', () => {
   const downloadButton = document.getElementById('download-button');
   const allDownloadButton = document.getElementById('all-downloads-button');
   let OS;
   let extension;
   let className;

   if (navigator.appVersion.includes('Win')) {
      OS = 'Windows';
      className = 'fa-windows';
      extension = 'exe';
   }
   else if (navigator.appVersion.includes('Mac')) {
      OS = 'MacOS';
      className = 'fa-apple';
      extension = 'dmg';
   }
   else if (navigator.appVersion.includes('Linux')) {
      OS = 'Linux';
      className = 'fa-linux';
      extension = 'appImage';
   }

   if (OS) {
      fetch('https://api.github.com/repos/fabio286/antares/releases/latest')
         .then(response => response.json())
         .then(data => {
            const expString = `.*${extension}$`;
            const exp = new RegExp(expString);
            const latest = data.assets.find(asset => exp.test(asset.browser_download_url));

            downloadButton.href = latest.browser_download_url;
            downloadButton.innerHTML = `<i class="fa ${className} is-size-5 mr-2"></i> Download Antares (${data.name})`;
            allDownloadButton.classList.toggle('is-hidden');
         });
   }
});
