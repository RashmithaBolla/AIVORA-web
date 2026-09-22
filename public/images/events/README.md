# Event Gallery Images

Drop your event photos in this folder.

## Naming convention

```
<event-id>-<number>.jpg
```

Examples:
- `club-launch-1.jpg`
- `club-launch-2.jpg`
- `workshop-1.jpg`

## How to wire them up in the code

Open `src/pages/AboutUs.tsx` and find the `eventGalleries` array at the top of the file.

### Adding images to an existing event (e.g. AIVORA Club Launch)

```ts
{
  id: 'club-launch',
  name: 'AIVORA Club Launch',
  ...
  images: [
    { src: '/images/events/club-launch-1.jpg', caption: 'Inauguration' },
    { src: '/images/events/club-launch-2.jpg', caption: 'Team photo' },
    // add more...
  ],
},
```

### Adding a brand-new event

Copy the template below and paste it inside the `eventGalleries` array:

```ts
{
  id: 'my-event',          // unique identifier, no spaces
  name: 'My Event Name',   // displayed in the UI
  date: 'October 2026',    // optional
  description: 'Short description of the event.',
  images: [
    { src: '/images/events/my-event-1.jpg', caption: 'Optional caption' },
    // Leave src as "" to show a placeholder instead:
    { src: '', caption: 'Photo coming soon' },
  ],
},
```
