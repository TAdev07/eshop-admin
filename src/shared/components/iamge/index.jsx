import { Image as ImageAnt } from 'antd';
import { useState } from 'react';

export function Image(props) {
  const [preview, setPreview] = useState(true);

  return (
    <ImageAnt
      onError={(e) => setPreview(false)}
      {...props}
      preview={preview}
    ></ImageAnt>
  );
}
