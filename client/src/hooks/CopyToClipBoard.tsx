import toast from "react-hot-toast";

export const key = Math.random().toString(36).substring(2, 10)

const generateLink = () => {
  return `${window.location.href}?chatKey=${key}`;
}

export const copyToClipboard = () => {
  const link = generateLink(); // Call it once to ensure consistent link
  console.log(key)

  // Check if the Clipboard API is supported
  if (navigator.clipboard) {
    navigator.clipboard.writeText(link).then(() => {
      toast.success('Link copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy link: ', err);
      toast.error('Failed to copy link');
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy link: ', err);
      toast.error('Failed to copy link');
    }
    document.body.removeChild(textArea);
  }
};
