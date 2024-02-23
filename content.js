// content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'analyzePage') {
    const pageTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]')?.content || 'N/A';
    const keywords = document.querySelector('meta[name="keywords"]')?.content || 'N/A';
    const canonicalURL = getCanonicalURL();
    const robotsTxt = getRobotsTxtStatus();
    const pageAuthor = getPageAuthorStatus();
    const publisherStatus = getPublisherStatus();
    const pageLanguage = getPageLanguage();
    const hreflangTags = getHreflangTags();
    const brokenLinks = findBrokenLinks();
    const headers = getHeaderInformation();
    const brokenImages = findBrokenImages();

    const analysis = `
      <table border="1">
        <tr><td><strong>Title:</strong></td><td>${pageTitle} (${countCharacters(pageTitle)} characters / ${countPixels(pageTitle)} pixels)</td></tr>
        <tr><td><strong>Meta Description:</strong></td><td>${metaDescription} (${countCharacters(metaDescription)} characters / ${countPixels(metaDescription)} pixels)</td></tr>
        <tr><td><strong>Keywords:</strong></td><td>${keywords} (${countCharacters(keywords)} characters / ${countPixels(keywords)} pixels)</td></tr>
        <tr><td><strong>Canonical URL:</strong></td><td>${canonicalURL || 'N/A'}</td></tr>
        <tr><td><strong>Robots.txt Status:</strong></td><td>${robotsTxt || 'N/A'}</td></tr>
        <tr><td><strong>Page Author Status:</strong></td><td>${pageAuthor || 'N/A'}</td></tr>
        <tr><td><strong>Publisher Status:</strong></td><td>${publisherStatus || 'N/A'}</td></tr>
        <tr><td><strong>Page Language:</strong></td><td>${pageLanguage || 'N/A'}</td></tr>
        <tr><td><strong>Hreflang Tags:</strong></td><td>${hreflangTags || 'N/A'}</td></tr>
        <tr><td><strong>Broken Links:</strong></td><td>${brokenLinks || 'N/A'}</td></tr>
        <tr><td><strong>Headers:</strong></td><td>${headers || 'N/A'}</td></tr>
        <tr><td><strong>Broken Images:</strong></td><td>${brokenImages || 'N/A'}</td></tr>
      </table>
    `;

    chrome.runtime.sendMessage({action: 'displayAnalysis', analysis: analysis});
  }
});

function countCharacters(text) {
  return text ? text.length : 0;
}

function countPixels(text) {
  // Assuming an average of 7 pixels per character, you can adjust this based on your font size
  return countCharacters(text) * 7;
}

function getCanonicalURL() {
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  return canonicalLink ? canonicalLink.href : 'N/A';
}

function getRobotsTxtStatus() {
  // Implement logic to check robots.txt status
  return 'Allowed';
}

function getPageAuthorStatus() {
  // Implement logic to check page author status
  return 'John Doe';
}

function getPublisherStatus() {
  // Implement logic to check publisher status
  return 'Example Publisher';
}

function getPageLanguage() {
  // Implement logic to detect page language
  return 'en';
}

function getHreflangTags() {
  // Implement logic to extract hreflang tags
  return 'en-US, en-GB';
}

function findBrokenLinks() {
  // Implement logic to find broken links
  return 5; // Example number of broken links
}

function getHeaderInformation() {
  // Implement logic to extract header information
  const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
                    .map(heading => `${heading.tagName}: ${heading.textContent}`);
  return headers.join('<br>');
}

function findBrokenImages() {
  // Implement logic to find broken images
  const brokenImages = Array.from(document.images)
    .filter(img => img.naturalWidth === 0 || img.complete === false)
    .map(img => img.src);
  return brokenImages.length > 0 ? brokenImages.join('<br>') : 'N/A';
}
