import math
from PIL import Image, ImageFont, ImageDraw, ImageFilter, ImageChops

W, H = 1536, 1245
final = Image.new('RGBA', (W, H), (0, 0, 0, 0))

# 1. LOAD CLEAN CROWN
crown = Image.open('public/assets/test_crown.png')
cw, ch = crown.size
cpix = crown.load()
# Clean bottom edge of crown
for cy in range(235, ch):
    for cx in range(cw):
        cpix[cx, cy] = (0, 0, 0, 0)

# 2. RENDER INTERLOCKING LETTERS 'A' & 'N'
font_path = 'src/assets/fonts/CinzelDecorative-Bold.ttf'
font = ImageFont.truetype(font_path, 520)

mask_a = Image.new('L', (W, H), 0)
ImageDraw.Draw(mask_a).text((360, 360), 'A', font=font, fill=255)

mask_n = Image.new('L', (W, H), 0)
ImageDraw.Draw(mask_n).text((670, 360), 'N', font=font, fill=255)

mask_letters = ImageChops.lighter(mask_a, mask_n)

# 3. DRAW ELEGANT LAUREL WREATH BRANCHES IN GOLD & BLUSH
wreath_mask = Image.new('L', (W, H), 0)
d_wreath = ImageDraw.Draw(wreath_mask)

# Function to draw laurel leaf pair
def add_leaf_pair(mask_img, cx, cy, length, angle):
    rad = math.radians(angle)
    dx = math.cos(rad) * length
    dy = math.sin(rad) * length
    # Leaf 1 (tilted out)
    r1 = math.radians(angle - 35)
    p1_tip = (cx + math.cos(r1)*length, cy + math.sin(r1)*length)
    p1_side1 = (cx + math.cos(r1-0.5)*length*0.5, cy + math.sin(r1-0.5)*length*0.5)
    p1_side2 = (cx + math.cos(r1+0.5)*length*0.5, cy + math.sin(r1+0.5)*length*0.5)
    ImageDraw.Draw(mask_img).polygon([(cx, cy), p1_side1, p1_tip, p1_side2], fill=255)

    # Leaf 2 (tilted up)
    r2 = math.radians(angle + 35)
    p2_tip = (cx + math.cos(r2)*length, cy + math.sin(r2)*length)
    p2_side1 = (cx + math.cos(r2-0.5)*length*0.5, cy + math.sin(r2-0.5)*length*0.5)
    p2_side2 = (cx + math.cos(r2+0.5)*length*0.5, cy + math.sin(r2+0.5)*length*0.5)
    ImageDraw.Draw(mask_img).polygon([(cx, cy), p2_side1, p2_tip, p2_side2], fill=255)

# Left laurel curve
left_curve = []
for t in range(50):
    rel = t / 49.0
    # Arc from bottom (480, 960) to (180, 640) up to (300, 320)
    x = (1 - rel)**2 * 460 + 2 * (1 - rel) * rel * 160 + rel**2 * 300
    y = (1 - rel)**2 * 960 + 2 * (1 - rel) * rel * 660 + rel**2 * 320
    left_curve.append((x, y))

d_wreath.line(left_curve, fill=255, width=9)

for i in range(4, 48, 5):
    pt = left_curve[i]
    dx = left_curve[i+1][0] - left_curve[i-1][0]
    dy = left_curve[i+1][1] - left_curve[i-1][1]
    ang = math.degrees(math.atan2(dy, dx))
    add_leaf_pair(wreath_mask, pt[0], pt[1], 48, ang - 90)

# Right laurel curve
right_curve = []
for t in range(50):
    rel = t / 49.0
    x = (1 - rel)**2 * (W - 460) + 2 * (1 - rel) * rel * (W - 160) + rel**2 * (W - 300)
    y = (1 - rel)**2 * 960 + 2 * (1 - rel) * rel * 660 + rel**2 * 320
    right_curve.append((x, y))

d_wreath.line(right_curve, fill=255, width=9)

for i in range(4, 48, 5):
    pt = right_curve[i]
    dx = right_curve[i+1][0] - right_curve[i-1][0]
    dy = right_curve[i+1][1] - right_curve[i-1][1]
    ang = math.degrees(math.atan2(dy, dx))
    add_leaf_pair(wreath_mask, pt[0], pt[1], 48, ang + 90)

# 4. GOLD TEXTURE & 3D RENDERING
gold_tile = Image.open('public/assets/gold_sample.png')
gold_tex = gold_tile.resize((W, H), Image.Resampling.LANCZOS)

# Render Wreath in Gold with soft olive & rose tint
wreath_img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
wreath_img.paste(gold_tex, (0, 0), wreath_mask)

# Add delicate rose flower buds along the laurels
buds_img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
d_buds = ImageDraw.Draw(buds_img)
for i in [14, 24, 34]:
    # Left buds
    pt = left_curve[i]
    d_buds.ellipse([pt[0]-24, pt[1]-20, pt[0]+24, pt[1]+20], fill=(235, 140, 165, 230), outline=(190, 80, 110, 240), width=2)
    d_buds.circle((pt[0], pt[1]), 5, fill=(255, 220, 110, 255))
    # Right buds
    pt_r = right_curve[i]
    d_buds.ellipse([pt_r[0]-24, pt_r[1]-20, pt_r[0]+24, pt_r[1]+20], fill=(235, 140, 165, 230), outline=(190, 80, 110, 240), width=2)
    d_buds.circle((pt_r[0], pt_r[1]), 5, fill=(255, 220, 110, 255))

# Render Letters in 3D Gold
letters = Image.new('RGBA', (W, H), (0, 0, 0, 0))
letters.paste(gold_tex, (0, 0), mask_letters)

mask_hi = ImageChops.subtract(mask_letters, ImageChops.offset(mask_letters, 3, 3)).filter(ImageFilter.GaussianBlur(1.8))
hi_layer = Image.new('RGBA', (W, H), (255, 250, 205, 220))
letters.paste(hi_layer, (0, 0), mask_hi)

mask_lo = ImageChops.subtract(mask_letters, ImageChops.offset(mask_letters, -3, -3)).filter(ImageFilter.GaussianBlur(1.8))
lo_layer = Image.new('RGBA', (W, H), (80, 45, 15, 230))
letters.paste(lo_layer, (0, 0), mask_lo)

stroke_mask = ImageChops.subtract(
    mask_letters.filter(ImageFilter.MaxFilter(5)),
    mask_letters.filter(ImageFilter.MinFilter(3))
)
stroke_layer = Image.new('RGBA', (W, H), (150, 95, 30, 240))
letters.paste(stroke_layer, (0, 0), stroke_mask)

# Drop Shadows
shadow_let = mask_letters.filter(ImageFilter.GaussianBlur(16))
shadow_wre = wreath_mask.filter(ImageFilter.GaussianBlur(12))
combined_shadow = ImageChops.lighter(shadow_let, shadow_wre)
shadow_img = Image.new('RGBA', (W, H), (65, 35, 15, 95))

# COMPOSITE ALL
final.paste(shadow_img, (0, 14), combined_shadow)
final.paste(wreath_img, (0, 0), wreath_mask)
final.paste(buds_img, (0, 0), buds_img)
final.paste(letters, (0, 0), mask_letters)

# Crown on top
final.paste(crown, (int((W - cw)/2), 160), crown)

final.save('public/assets/monogram-an-transparent.png')
print('make_royal_crest.py completed successfully!')
