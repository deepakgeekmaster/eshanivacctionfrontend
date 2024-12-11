"use client";
import React, { useState, useRef, useMemo,useEffect  } from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const JoditEditorComponent = ({ onChange, value }) => {  // Accept `onChange` and `value` props from parent
  const editor = useRef(null); 
  const [content, setContent] = useState(value || "");  // Default content as prop `value`
  useEffect(() => {
    setContent(value || "");  // Update content if value prop changes
  }, [value]); // Trigger when value changes
  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'], // Allowed image formats
      },
    }),
    []
  );

  const handleChange = (value) => {
    setContent(value);
    if (onChange) {
      onChange(value);  // Pass updated content to parent
    }
  };

  return (
    <div className="">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={handleChange}
        className="w-full h-[100px] bg-white"
      />
      
      <style>
        {`.jodit-wysiwyg { height: 100px !important; }`} {/* Set custom editor height */}
      </style>
    </div>
  );
};

export default JoditEditorComponent;
