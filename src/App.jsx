import React from 'react';
import Image from './components/ui/Image/Image';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Image Component Demo</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Regular Image with Lazy Loading</h2>
        <Image
          src="https://picsum.photos/400/300?random=1"
          alt="Random image from Picsum"
          aspectRatio="4/3"
          style={{ maxWidth: '400px' }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Image with Error Handling (Broken URL)</h2>
        <Image
          src="https://invalid-url-for-testing.com/image.jpg"
          alt="This image will show error fallback"
          aspectRatio="16/9"
          style={{ maxWidth: '400px' }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Image with Fallback (Broken URL + Fallback)</h2>
        <Image
          src="https://invalid-url-for-testing.com/image.jpg"
          alt="This image will show fallback image"
          fallbackSrc="https://picsum.photos/400/300?random=2"
          aspectRatio="1/1"
          style={{ maxWidth: '300px' }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Eager Loading Image</h2>
        <Image
          src="https://picsum.photos/400/300?random=3"
          alt="Eagerly loaded image"
          loading="eager"
          aspectRatio="3/2"
          style={{ maxWidth: '400px' }}
        />
      </div>
    </div>
  );
}

export default App;