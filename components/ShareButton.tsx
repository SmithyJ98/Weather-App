"use client"

 import React, { useState, FunctionComponent } from "react"
 import { Share2 } from "lucide-react"

// export default function ShareButton() {
//   const [copied, setCopied] = useState(false)

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     } catch (err) {
//       console.error("Failed to copy: ", err)
//     }
//   }

//   return (
//     <button
//       onClick={handleShare}
//       className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
//     >
//       <Share2 className="w-5 h-5 mr-2" />
//       {copied ? "Copied!" : "Share"}
//     </button>
//   )
// }

interface ButtonProps {
    text?: string;
  }
  
  const ShareButton: FunctionComponent<ButtonProps> = () => {
    const [copied, setCopied] = useState<boolean>(false);
  
    const handleShare = async (): Promise<void> => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };
  
    return (
      <button
        onClick={handleShare}
        className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
      >
        <Share2 className="w-5 h-5 mr-2" />
        {copied ? "Copied!" : "Share"}
      </button>
    );
  };
  
  export default ShareButton;