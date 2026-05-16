from PIL import Image, ImageEnhance, ImageDraw
import os

def create_seo_image():
    base_path = r'c:\Users\globa\OneDrive\CSSG_B2B_MACHINE\public\secuestro.webp'
    logo_path = r'c:\Users\globa\OneDrive\CSSG_B2B_MACHINE\public\logo.png'
    output_path = r'c:\Users\globa\OneDrive\CSSG_B2B_MACHINE\public\seo_escudo.jpg'

    # Open base image
    bg = Image.open(base_path).convert('RGBA')

    # Resize background to cover 1200x630 (Standard Open Graph)
    target_width, target_height = 1200, 630
    bg_ratio = bg.width / bg.height
    target_ratio = target_width / target_height

    if bg_ratio > target_ratio:
        # bg is wider, scale to height and crop width
        new_h = target_height
        new_w = int(new_h * bg_ratio)
    else:
        # bg is taller, scale to width and crop height
        new_w = target_width
        new_h = int(new_w / bg_ratio)

    bg = bg.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = (new_w - target_width) // 2
    top = (new_h - target_height) // 2
    bg = bg.crop((left, top, left + target_width, top + target_height))

    # Add dark overlay
    overlay = Image.new('RGBA', bg.size, (10, 10, 10, 180)) # 180 out of 255 opacity
    bg = Image.alpha_composite(bg, overlay)

    # Load logo
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        
        # Resize logo to be ~30% of the image width
        logo_w = int(target_width * 0.3)
        logo_h = int(logo.height * (logo_w / logo.width))
        logo = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)

        # Paste logo in the center
        logo_x = (target_width - logo_w) // 2
        logo_y = (target_height - logo_h) // 2
        bg.paste(logo, (logo_x, logo_y), logo)
    
    # Save as JPG
    bg.convert('RGB').save(output_path, format='JPEG', quality=85)
    print("SEO Image generated at", output_path)

if __name__ == "__main__":
    create_seo_image()
