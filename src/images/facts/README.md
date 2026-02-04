# Facts Page Images

This directory contains images used in the facts page about donkeys.

## Image Files

The following images are referenced in the facts content markdown file:

- `donkey-portrait.jpg` - Main portrait image of a donkey for hero section
- `donkey-herd.jpg` - Image showing donkeys in their natural herd environment
- `ancient-donkey-art.jpg` - Historical artwork or archaeological evidence of ancient donkeys
- `working-donkey.jpg` - Image of donkeys being used for work/transportation
- `baby-donkey.jpg` - Image of young donkeys/foals

## Image Requirements

### Format
- Primary format: WebP for modern browsers
- Fallback format: JPEG for compatibility
- Progressive JPEG encoding for faster loading

### Sizes
- Hero images: 1200px wide (maximum)
- Content images: 800px wide (maximum)
- Thumbnail versions: 400px wide

### Optimization
- WebP images should be 25-35% smaller than JPEG equivalents
- JPEG quality: 85% for hero images, 80% for content images
- All images should use sRGB color space
- Include proper EXIF data removal for privacy

### Responsive Images
Each image should have multiple variants:
- `image-name-400w.webp` / `image-name-400w.jpg`
- `image-name-800w.webp` / `image-name-800w.jpg`
- `image-name-1200w.webp` / `image-name-1200w.jpg`

### Alt Text
All images must include descriptive alt text for accessibility:
- Describe what is visible in the image
- Include context relevant to the facts content
- Keep descriptions concise but informative

## Build Process

Images are processed during the build with the following optimizations:
1. Automatic WebP conversion with fallbacks
2. Responsive image generation (srcset)
3. Lazy loading implementation
4. Compression and optimization

## Usage in Content

Images are referenced in the markdown frontmatter and can be included in content using standard markdown syntax:

```markdown
![Descriptive alt text](donkey-portrait.jpg)
```

Or with figure elements for captions:

```markdown
![Descriptive alt text](donkey-herd.jpg)
*Caption: Donkeys naturally form small, stable herds in the wild*
```

## Copyright and Attribution

All images should be:
- Copyright-free or properly licensed
- Include attribution if required
- Use images that are appropriate for educational content
- Ensure images are culturally sensitive and accurate