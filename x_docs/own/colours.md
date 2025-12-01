# shadcn/ui Color Variables - Mapped from Figma

Used Figma images to get colours and map to these shadcn/ui variable names. These variable names get used in shadcn/ui components. Images from figma can be seen here in [images/](./images/)

## Core Color Variables

| Variable Name | What It Colors | Light Mode | Dark Mode | Gradient (for components) |
|---------------|----------------|------------|-----------|---------------------------|
| `--background` | Main page background | #FDFDFD | #0F1117 | - |
| `--foreground` | Main body text (paragraphs, readable content) | #0F1117 | #DCE3F1 | - |
| `--card` | Card/panel backgrounds | #FFFFFF | #151821 | - |
| `--card-foreground` | Text inside cards (headings, titles) | #0F1117 | #FFFFFF | - |
| `--primary` | Primary buttons | #FF7000 | #FF7000 | `linear-gradient(93.22deg, #FF7000 -13.95%, #E2995F 99.54%)` |
| `--primary-foreground` | Text on primary buttons | #FFFFFF | #FFFFFF | - |
| `--secondary` | Secondary buttons | shadcn slate default | shadcn slate default | - |
| `--secondary-foreground` | Text on secondary buttons | shadcn slate default | shadcn slate default | - |
| `--muted` | Subtle backgrounds (search bar, tags) | #F4F6F8 | #212734 | Dark: `linear-gradient(267.08deg, rgba(23, 28, 35, 0.406) 10.27%, rgba(19, 22, 28, 0.7) 88.57%)` |
| `--muted-foreground` | Subtle/secondary text (metadata, timestamps) | #858EAD | #828fc3 | - |
| `--accent` | Hover states, highlights (blue) | #7B8EC8 | #1DA1F2 | - |
| `--accent-foreground` | Text on accents | #FFFFFF | #FFFFFF | - |
| `--border` | Lines/borders/dividers | #F4F6F8 | #151821 | - |
| `--input` | Input field backgrounds | #DCE3F1 | #151821 | Same as `--muted` gradient |
| `--destructive` | Error/delete buttons | #EF4444 | #EF4444 | - |
| `--ring` | Focus outline | #FF7000 | #1DA1F2 | - |

## Sidebar Colors

| Variable Name | What It Colors | Light Mode | Dark Mode | Gradient (for components) |
|---------------|----------------|------------|-----------|---------------------------|
| `--sidebar` | Sidebar background | #FFFFFF | #0F1117 | - |
| `--sidebar-foreground` | Sidebar text | #151821 | #FFFFFF | - |
| `--sidebar-primary` | Active sidebar item (orange Home button) | #FF7000 | #FF7000 | Same gradient as `--primary` |
| `--sidebar-primary-foreground` | Text on active sidebar item | #FFFFFF | #FFFFFF | - |
| `--sidebar-accent` | Sidebar hover state | #F4F6F8 | #1F2937 | - |
| `--sidebar-border` | Sidebar borders | #F4F6F8 | #151821 | - |

## Color Palette Reference (from colours.jpg)

### Light Colors

- Light-900: `#FFFFFF`
- Light-850: `#FDFDFD`
- Light-800: `#F4F6F8`
- Light-700: `#DCE3F1`
- Light-500: `#7B8EC8`
- Light-400: `#858EAD`

### Dark Colors

- Dark-100: `#000000`
- Dark-200: `#0F1117`
- Dark-300: `#151821`
- Dark-400: `#212734`
- Dark-500: `#3F4354`

### Accent Colors

- Primary Orange: `#FF7000`
- Accent-800: `#FFF1E6`
- Orange Gradient: `linear-gradient(93.22deg, #FF7000 -13.95%, #E2995F 99.54%)`

## Instructions for Light Mode

1. Open `home-light.jpg` and other light mode screenshots
2. For each row marked **TBD**, find that element in the screenshot
3. Go to Figma, click on that element
4. Copy the color value (hex from the palette above)
5. Replace **TBD** with the hex value
6. When done, I'll update your `globals.css` with these exact colors

## Notes

- Colors that are the same in both modes (like `--primary` orange) are already filled in
- Use the Color Palette Reference above to pick the right light mode colors
- Most light mode backgrounds will use Light-900, Light-850, or Light-800
- Most light mode text will use Dark-100, Dark-300, or Light-400 for subtle text
